let form = document.querySelector("#searchForm");
if (form) {
  form.addEventListener("submit", function (e) {
    // prevent submit button which submits all form values to a form-handler
    e.preventDefault();
    const response = document.querySelector("#stockSearch").value;
    // redirect url to stock analysis page
    window.location = "stock-analysis.html?stock=" + response;
  });
}