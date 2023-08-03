// eslint-disable-next-line no-unused-vars
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("tabindex", "0");
  modal.focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// function to manage the enter key on the keyboard
// eslint-disable-next-line no-unused-vars
function handleKeyPress(event) {
  if (event.key === "Enter") {
    closeModal();
  }
}

// function for check input
function checkInput(nodeDuChamp, regex, message) {
  if (!nodeDuChamp.value || !regex.test(nodeDuChamp.value)) {
    displayError(message);
    return true;
  }
  else {
    hideError(message);
    return false;
  }
}
// function for display error message
function displayError(message) {
  message.textContent = "Veuillez remplir correctement ce champ";
}

// function for hide error message
function hideError(message) {
  message.textContent = "";
}
// function for check user input in modal
// eslint-disable-next-line no-unused-vars
function sendModal() {

  const modal = document.getElementById("contact_modal");

  // regex test
  let regexFirstName = /^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/;
  let regexLastName = /^[A-Za-z]{3,20}$/;
  let regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let regexMessage = /^[a-zA-Z0-9\s.,?!'"()@#$%&*-]+$/;

  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  const messageErrorMsg = document.getElementById("messageErrorMsg");

  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  checkInput(first, regexFirstName, firstNameErrorMsg);
  checkInput(last, regexLastName, lastNameErrorMsg);
  checkInput(email, regexEmail, emailErrorMsg);
  checkInput(message, regexMessage, messageErrorMsg);

  if (
    !checkInput(first, regexFirstName, firstNameErrorMsg)
    && !checkInput(last, regexLastName, lastNameErrorMsg)
    && !checkInput(email, regexEmail, emailErrorMsg)
    && !checkInput(message, regexMessage, messageErrorMsg)) {
    console.log("Prénom :", first.value, "Nom :", last.value, "Email :", email.value, "Message:", message.value);
    modal.style.display = "none";
  }

}