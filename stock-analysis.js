// alpha vantage api key
const apiKey = "IA2UTE9ALTXD6IAL";

// declaring variables
let stock;
let analysisStockChartDiv;
let analysisTimeOptionsDiv;
let analysisStockChart;
let analysisStockData = [];
let currentTab = "analysis";
let currentTimeOption = "1D";

// formatting and styling stock analysis chart
let analysisOptions = {
  series: [],
  chart: {
    height: 480,
    type: "line",
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return `<div class="arrow_box">
        <h5>${moment(analysisStockData[dataPointIndex].time).format(
          "MMM DD, YYYY, LT"
        )}
        </h5>
        <p>High: ${analysisStockData[dataPointIndex].high}</p>
        <p>Low: ${analysisStockData[dataPointIndex].low}</p>
        <p>Close: ${analysisStockData[dataPointIndex].close}</p>
        <p>Volume: ${analysisStockData[dataPointIndex].volume}</p>
        </div>`;
    },
  },
  title: {
    text: "",
    align: "center",
    style: {
      fontSize: "20px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#263238",
    },
  },
  series: [],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: [],
    tickAmount: 10,
    title: {
      text: "Timestamp",
      align: "center",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    },
  },
  yaxis: {
    title: {
      text: "Price",
      align: "center",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    },
  },
};

// 
let stockContainer = document.querySelector("#stockContainer");
if (stockContainer) {
  financialsStockChartDiv = document.querySelector("#financialsStockChart");
  analysisStockChartDiv = document.querySelector("#analysisStockChart");
  analysisTimeOptionsDiv = document.querySelector("#analysisTimeOptions");
  earningsStockChartDiv = document.querySelector("#earningsStockChart");

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  stock = params["stock"];
  fetchResults(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock}&apikey=${apiKey}`
  ).then((results) => {
    showSidebar(results);
    if (analysisStockChartDiv) {
      analysisStockChart = new ApexCharts(
        analysisStockChartDiv,
        analysisOptions
      );
      analysisStockChart.render();
      selectTimeOption("1D");
      fetchResults(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${apiKey}`
      )
        .then((results) => {
          showAnalysisChart(results);
        })
        .catch((e) => {});
    }
  });
}

// variable for the respective button in stock-analysis page
let analysisDailyOption = document.getElementById("1D");
let analysisWeeklyOption = document.getElementById("1W");
let analysisMonthlyOption = document.getElementById("1M");
let stockAnalysisBtn = document.querySelector("#stockAnalysisBtn");
let stockEarningsBtn = document.querySelector("#stockEarningsBtn");
let stockFinancialsBtn = document.querySelector("#stockFinancialsBtn");

if (analysisDailyOption) {
  analysisDailyOption.addEventListener("click", function (e) {
    selectTimeOption("1D");
    fetchResults(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${apiKey}`
    )
      .then((results) => {
        showAnalysisChart(results);
      })
      .catch((e) => {});
  });
}
if (analysisWeeklyOption) {
  analysisWeeklyOption.addEventListener("click", function (e) {
    selectTimeOption("1W");
    fetchResults(
      `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${stock}&outputsize=full&apikey=${apiKey}`
    )
      .then((results) => {
        showAnalysisChart(results);
      })
      .catch((e) => {});
  });
}
if (analysisMonthlyOption) {
  analysisMonthlyOption.addEventListener("click", function (e) {
    selectTimeOption("1M");
    fetchResults(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock}&outputsize=full&apikey=${apiKey}`
    )
      .then((results) => {
        showAnalysisChart(results);
      })
      .catch((e) => {});
  });
}


stockAnalysisBtn.addEventListener("click", function (e) {
  fetchResults(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${apiKey}`
  )
    .then((results) => {
      showAnalysisChart(results);
    })
    .catch((e) => {});
});

// input data received into sidebar
function showSidebar(results) {
  const stockNameTitle = document.getElementById("stockName");
  const stockDescTitle = document.getElementById("stockDesc");
  const stockTickerTitle = document.getElementById("stockTicker");
  stockNameTitle.innerHTML = results.Name;
  stockDescTitle.innerHTML = results.Description;
  stockTickerTitle.innerHTML = results.Symbol;
}

// data massaging for stock analysis
function showAnalysisChart(result) {
  currentTab = "analysis";
  showCurrentTab();

  let categories = [];
  let yValues = [];
  let key =
    currentTimeOption == "1D"
      ? "Time Series (Daily)"
      : currentTimeOption == "1W"
      ? "Weekly Time Series"
      : "Monthly Time Series";
  let titleKey =
    currentTimeOption == "1D"
      ? "Daily"
      : currentTimeOption == "1W"
      ? "Weekly"
      : "Monthly";
  Object.entries(result[key])
    .slice(0, 200)
    .forEach((data) => {
      categories.push(data[0]);
      analysisStockData.push({
        high: data[1]["2. high"],
        low: data[1]["3. low"],
        close: data[1]["4. close"],
        volume: data[1]["5. volume"],
        time: data[0],
      });
      yValues.push(+data[1]["4. close"]);
    });

  analysisStockChart.updateSeries([
    {
      name: `${titleKey} Prices of ${stock}`,
      data: yValues,
    },
  ]);
  let extraOptions = {
    labels: {
      formatter: function (val, timestamp) {
        return moment(val).format("DD MMM LT");
      },
    },
  };
  if (currentTimeOption == "1W") {
    extraOptions = {
      labels: {
        formatter: function (val, timestamp) {
          return moment(val).format("DD MMM");
        },
      },
    };
  } else if (currentTimeOption == "1M") {
    extraOptions = {
      labels: {
        formatter: function (val, timestamp) {
          return moment(val).format("MMM YYYY");
        },
      },
    };
  }
  analysisStockChart.updateOptions({
    xaxis: {
      ...analysisOptions.xaxis,
      categories,
      ...extraOptions,
    },
    title: {
      ...analysisOptions.title,
      text: `${titleKey} Prices of ${stock.toUpperCase()}`,
    },
  });
}

function fetchResults(url) {
  return axios
    .get(url)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// toggle between different chart
function showCurrentTab() {
  if (currentTab == "analysis") {
    analysisStockChartDiv.style.display = "block";
    analysisTimeOptionsDiv.style.display = "block";
    earningsStockChartDiv.style.display = "none";
    financialsStockChartDiv.style.display = "none";
  } else if (currentTab == "earnings") {
    analysisStockChartDiv.style.display = "none";
    analysisTimeOptionsDiv.style.display = "none";
    earningsStockChartDiv.style.display = "block";
    financialsStockChartDiv.style.display = "none";
  } else if (currentTab == "financials") {
    analysisStockChartDiv.style.display = "none";
    analysisTimeOptionsDiv.style.display = "none";
    earningsStockChartDiv.style.display = "none";
    financialsStockChartDiv.style.display = "block";
  }
}

// toggle between different time option
function selectTimeOption(option) {
  if (option == "1D") {
    currentTimeOption = "1D";
    analysisDailyOption.classList.add("selected-btn");
    analysisWeeklyOption.classList.remove("selected-btn");
    analysisMonthlyOption.classList.remove("selected-btn");
  } else if (option == "1W") {
    currentTimeOption = "1W";
    analysisDailyOption.classList.remove("selected-btn");
    analysisWeeklyOption.classList.add("selected-btn");
    analysisMonthlyOption.classList.remove("selected-btn");
  } else if (option == "1M") {
    currentTimeOption = "1M";
    analysisDailyOption.classList.remove("selected-btn");
    analysisWeeklyOption.classList.remove("selected-btn");
    analysisMonthlyOption.classList.add("selected-btn");
  }
}
