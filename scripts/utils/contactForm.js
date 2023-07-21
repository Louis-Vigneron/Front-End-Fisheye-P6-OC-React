function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
      closeModal();
  }
}

const send = document.querySelector(".send-button");
const modal = document.getElementById("contact_modal");
if (send && modal) {
    send.addEventListener("click", sendModal())
}





// function for check input
function checkInput(input, regex) {
    if (!input.value || !regex.test(input.value)) {
  
      return true;
    } else {
      return false;
    }
  }
  
  function sendModal() {

// defining variables for the form

// regex test
let regexFirstName = /^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/;
let regexLastName = /^[A-Za-z]{3,20}$/;
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let regexMessage = /^[a-zA-Z0-9\s.,?!'"()@#$%&*-]+$/;

    const first = document.getElementById("first");
    const last = document.getElementById("last");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    checkInput(first, regexFirstName);
    checkInput(last, regexLastName);
    checkInput(email, regexEmail);
    checkInput(message, regexMessage);

  if (
    !checkInput(first, regexFirstName)
    && !checkInput(last, regexLastName)
    && !checkInput(email, regexEmail)
    && ! checkInput(message, regexMessage))
    {
        console.log("Prénom :", first.value, "Nom :", last.value, "Email :", email.value, "Message:", message.value);
        modal.style.display = "none";
    }
   
}