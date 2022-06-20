// alpha vantage api key
const apiKey = "IA2UTE9ALTXD6IAL";

// declaring variables
let stock;
let financialsStockChartDiv;
let analysisStockChartAreaDiv;
let analysisStockChartLineDiv;
let analysisTimeOptionsDiv;
let earningsStockChartDiv;
let financialsStockChart;
let analysisStockChartArea;
let analysisStockChartLine;
let earningsStockChart;
let analysisStockData = [];
let financialsStockData = [];
let earningsStockData = [];
let currentTab = "analysis";
let currentTimeOption = "1D";

// formatting and styling stock analysis chart (price)
let analysisOptionsArea = {
  series: [],
  chart: {
    id: "volume",
    group: "stock",
    type: "area",
    height: 260,
  },
  colors: ["#00E396"],
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
};

// formatting and styling stock analysis chart (volume)
let analysisOptionsLine = {
  series: [],
  chart: {
    id: "price",
    group: "stock",
    type: "line",
    height: 260,
  },
  colors: ["#008FFB"],
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

// formatting and styling earning chart
let earningsOptions = {
  series: [],
  chart: {
    type: "bar",
    height: 480,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
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
  fill: {
    opacity: 1,
  },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return `<div class="arrow_box">
        <p>${`Q${moment(earningsStockData[dataPointIndex].reportedDate)
          .utc()
          .quarter()} ${moment(
          earningsStockData[dataPointIndex].reportedDate
        ).format("DD MMM YYYY")}`}
        </p>
        <p>Estimated EPS: ${earningsStockData[dataPointIndex].estimatedEPS}</p>
        <p>Reported EPS: ${earningsStockData[dataPointIndex].reportedDate}</p>
        </div>`;
    },
  },
  xaxis: {
    categories: [],
    labels: {
      formatter: function (val, timestamp) {
        console.log(val, timestamp);
        return `Q${moment(timestamp).utc().quarter()} ${moment(
          timestamp
        ).format("YYYY")}`;
      },
    },
  },
};

let stockContainer = document.querySelector("#stockContainer");
if (stockContainer) {
  financialsStockChartDiv = document.querySelector("#financialsStockChart");
  analysisStockChartAreaDiv = document.querySelector("#analysisStockAreaChart");
  analysisStockChartLineDiv = document.querySelector("#analysisStockLineChart");
  analysisTimeOptionsDiv = document.querySelector("#analysisTimeOptions");
  earningsStockChartDiv = document.querySelector("#earningsStockChart");

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  stock = params["stock"];
  fetchResults(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock}&apikey=${apiKey}`
  ).then((results) => {
    showSidebar(results);

    if (financialsStockChartDiv) {
      financialsStockChart = new ApexCharts(
        financialsStockChartDiv,
        financialsOptions
      );
      financialsStockChart.render();
    }
    if (analysisStockChartAreaDiv && analysisStockChartLineDiv) {
      analysisStockChartArea = new ApexCharts(
        analysisStockChartAreaDiv,
        analysisOptionsArea
      );
      analysisStockChartArea.render();
      analysisStockChartLine = new ApexCharts(
        analysisStockChartLineDiv,
        analysisOptionsLine
      );
      analysisStockChartLine.render();
      selectTimeOption("1D");
      fetchResults(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${apiKey}`
      )
        .then((results) => {
          showAnalysisChart(results);
        })
        .catch((e) => {});
    }
    if (earningsStockChartDiv) {
      earningsStockChart = new ApexCharts(
        earningsStockChartDiv,
        earningsOptions
      );
      earningsStockChart.render();
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
// function when the earning button is click
stockEarningsBtn.addEventListener("click", function (e) {
  fetchResults(
    `https://www.alphavantage.co/query?function=EARNINGS&symbol=${stock}&apikey=${apiKey}`
  )
    .then((results) => {
      showEarningsChart(results);
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

  let prices = [];
  let volumes = [];
  // ternary operator if..else..
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
    .slice(0, 150)
    // sort the date of the data
    .sort((a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0))
    .forEach((data) => {
      analysisStockData.push({
        high: data[1]["2. high"],
        low: data[1]["3. low"],
        close: data[1]["4. close"],
        volume: data[1]["5. volume"],
        time: data[0],
      });
      prices.push([new Date(data[0]).getTime(), +data[1]["4. close"]]);
      volumes.push([new Date(data[0]).getTime(), +data[1]["5. volume"]]);
    });

  analysisStockChartLine.updateSeries([
    {
      name: `${titleKey} Prices of ${stock}`,
      data: prices,
    },
  ]);
  analysisStockChartArea.updateSeries([
    {
      name: `${titleKey} Volume of ${stock}`,
      data: volumes,
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
  analysisStockChartArea.updateOptions({
    xaxis: {
      // spread of the date
      tickAmount: 10,
      ...extraOptions,
    },
  });
  analysisStockChartLine.updateOptions({
    xaxis: {
      tickAmount: 10,
      ...extraOptions,
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

// data massaging for earning chart
function showEarningsChart(result) {
  currentTab = "earnings";
  showCurrentTab();

  let reportedEPS = [];
  let estimatedEPS = [];
  let categories = [];

  Object.entries(result["quarterlyEarnings"])
    .slice(0, 20)
    .forEach((data) => {
      categories.push(data[1]["reportedDate"]);
      earningsStockData.push({
        estimatedEPS: data[1]["estimatedEPS"],
        reportedDate: data[1]["reportedDate"],
        reportedEPS: data[1]["reportedEPS"],
      });
      reportedEPS.push(+data[1]["reportedEPS"]);
      estimatedEPS.push(+data[1]["estimatedEPS"]);
    });

  earningsStockChart.updateSeries([
    {
      name: "Reported EPS of " + stock.toUpperCase(),
      data: reportedEPS,
    },
    { name: "Estimated EPS of " + stock.toUpperCase(), data: estimatedEPS },
  ]);
  earningsStockChart.updateOptions({
    title: {
      ...earningsOptions.title,
      text: `${stock.toUpperCase()} Earnings, Revenues Date & History`,
    },
    xaxis: {
      ...earningsOptions.xaxis,
      categories,
    },
  });
}

// write a function for axios to get url
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
    analysisStockChartAreaDiv.style.display = "block";
    analysisStockChartLineDiv.style.display = "block";
    analysisTimeOptionsDiv.style.display = "block";
    earningsStockChartDiv.style.display = "none";
    financialsStockChartDiv.style.display = "none";
  } else if (currentTab == "earnings") {
    analysisStockChartAreaDiv.style.display = "none";
    analysisStockChartLineDiv.style.display = "none";
    analysisTimeOptionsDiv.style.display = "none";
    earningsStockChartDiv.style.display = "block";
    financialsStockChartDiv.style.display = "none";
  } else if (currentTab == "financials") {
    analysisStockChartAreaDiv.style.display = "none";
    analysisStockChartLineDiv.style.display = "none";
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
