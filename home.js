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

// validation for email
document.querySelector(".btnSub").addEventListener("click", function () {
  // flags
  // each flag represents one error (like a red flag)
  let isUserNameTooShort = false; // will be true if user name is less than 3 characters
  let isEmailInvalid = false; // will be true if the email is in an invalid format
  let isPasswordTooShort = false; // password must be at least seven characters
  let isConditionNotAccepted = false; // will be false if the terms and conditions are not accepted

  let email = document.querySelector("#txtEmail").value;

  if (!email.includes("@") || !email.includes(".")) {
    isEmailInvalid = true;
  }

  let password = document.querySelector("#txtPassword").value;
  if (password.length < 7) {
    isPasswordTooShort = true;
  }

  let conditionCheckbox = document.querySelector("#agree").checked;
  if (!conditionCheckbox) {
    isConditionNotAccepted = true;
  }

  let errorString = "";
  if (isUserNameTooShort) {
    document.querySelector("#txtUserNameError").innerHTML =
      "Sorry, the user name is too short";
  }
  if (isEmailInvalid) {
    document.querySelector("#txtEmailError").innerHTML = "The email is invalid";
  }
  if (isPasswordTooShort) {
    document.querySelector("#txtPasswordError").innerHTML =
      "The password is too short. Please make sure it has at least 7 characters";
  }
  if (isConditionNotAccepted) {
    document.querySelector("#txtConditonError").innerHTML =
      "Please accept the terms and conditions";
  }

  document.querySelector("#errors").innerHTML = errorString;

  if (
    isEmailInvalid ||
    isPasswordTooShort ||
    isConditionNotAccepted
  ) {
    document.querySelector("#errors").style.display = "block";
  }
});
