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

let customTextDiv = document.querySelector("#custom-text");
let words = [
  "Simplified Stock Research",
  "Knowing Who To Trust",
  "Smart Portfolio Management",
  "Wall Street Accountability",
];
let index = 0;

// ensure compatibility in different web browser
function whenAnimationEnd(element, callback) {
  element.addEventListener("animationend", callback, false);
  element.addEventListener("webkitAnimationEnd", callback, false);
  element.addEventListener("oanimationend", callback, false);
  element.addEventListener("MSAnimationEnd", callback, false);
}

// function to run for animated text
function repeat() {
  whenAnimationEnd(document.querySelector(".inner-text"), function (e) {
    var container = document.querySelector(".inner-text");
    // duplicate container to be used for other words
    var dupe = container.cloneNode(true);
    container.parentNode.replaceChild(dupe, container);
    if (e.animationName == "underline") {
      // index should not exceed 4
      index = (index + 1) % words.length;
      document.querySelector("#custom-text").innerHTML = words[index];
    }
    repeat();
  });
}
repeat();