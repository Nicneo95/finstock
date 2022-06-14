let form = document.querySelector("#searchForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const response = document.querySelector("#stockSearch").value;
    window.location = "stock-analysis.html?stock=" + response;
  });
}