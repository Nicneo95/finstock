// alpha vantage api key
const apiKey = "IA2UTE9ALTXD6IAL";

// declaring variables
let stock;
let financialsStockChartDiv;
let analysisStockChartDiv;
let analysisTimeOptionsDiv;
let earningsStockChartDiv;
let financialsStockChart;
let analysisStockChart;
let earningsStockChart;
let analysisStockData = [];
let financialsStockData = [];
let earningsStockData = [];
let currentTab = "analysis";
let currentTimeOption = "1D";

// formatting and styling stock analysis chart
let analysisOptions = {
  series: [],
  chart: {
    height: 480,
    group: "analysisCompany",
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

// formatting and styling financial chart
let financialsOptions = {
  series: [],
  chart: {
    height: 480,
    type: "line",
  },
  stroke: {
    width: [0, 4],
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
  dataLabels: {
    enabled: false,
  },
  labels: [],
  tooltip: {
    x: {
      formatter: function (val, timestamp) {
        return moment(val).format("MMM DD, YYYY");
      },
    },
  },
  xaxis: {
    type: "categories",
    labels: {
      formatter: function (val, timestamp) {
        return moment(val).format("MMM YYYY");
      },
    },
  },
  yaxis: [
    {
      title: {
        text: "",
      },
      labels: {
        show: false,
        formatter: function (val) {
          return Math.floor(val);
        },
      },
    },
    {
      title: {
        text: "Liabilities",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      labels: {
        formatter: function (val) {
          return Math.floor(val);
        },
      },
    },
    {
      opposite: true,
      title: {
        text: "Debt to Assets",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(1) + "%";
        },
      },
    },
  ],
};

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
    if (financialsStockChartDiv) {
      financialsStockChart = new ApexCharts(
        financialsStockChartDiv,
        financialsOptions
      );
      financialsStockChart.render();
    }
  });
}

// variable for the respective button in analysis stock chart
let analysisDailyOption = document.getElementById("1D");
let analysisWeeklyOption = document.getElementById("1W");
let analysisMonthlyOption = document.getElementById("1M");
// variable for the respective button to render different chart of the company
let stockAnalysisBtn = document.querySelector("#stockAnalysisBtn");
let stockEarningsBtn = document.querySelector("#stockEarningsBtn");
let stockFinancialsBtn = document.querySelector("#stockFinancialsBtn");

// output function when the respective button is click for analysis stock chart
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

// function when the stock analysis button is click
stockAnalysisBtn.addEventListener("click", function (e) {
  fetchResults(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${apiKey}`
  )
    .then((results) => {
      showAnalysisChart(results);
      showAnalysisChart2(results);
    })
    .catch((e) => {});
});
// function when the financial button is click
stockFinancialsBtn.addEventListener("click", function (e) {
  fetchResults(
    `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${stock}&apikey=${apiKey}`
  )
    .then((results) => {
      financialStockData = results;
      showFinancialsChart(results);
    })
    .catch((e) => {});
});

// input information of company selected into sidebar
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
  // using ternary operator if...else
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

// data massaging for financial chart
function showFinancialsChart(result) {
  currentTab = "financials";
  showCurrentTab();

  let assets = [];
  let liabilities = [];
  let debtToAssets = [];
  let categories = [];

  result["quarterlyReports"].slice(0, 10).forEach((data) => {
    categories.push(data["fiscalDateEnding"]);
    const debtAsset = (+data["totalLiabilities"] / +data["totalAssets"]) * 100;
    financialsStockData.push({
      totalAssets: data["totalAssets"],
      totalLiabilities: data["totalLiabilities"],
      debtToAssets: debtAsset,
    });
    debtToAssets.push(debtAsset);
    liabilities.push(+data["totalLiabilities"]);
    assets.push(+data["totalAssets"]);
  });

  financialsStockChart.updateSeries([
    {
      name: "Assets",
      type: "column",
      data: assets,
    },
    {
      name: "Liabilities",
      type: "column",
      data: liabilities,
    },
    {
      name: "Debt to Assets",
      type: "line",
      data: debtToAssets,
    },
  ]);
  financialsStockChart.updateOptions({
    title: {
      ...financialsOptions.title,
      text: `${stock.toUpperCase()} Debt to Assets`,
    },
    xaxis: {
      ...financialsOptions.xaxis,
      categories,
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
