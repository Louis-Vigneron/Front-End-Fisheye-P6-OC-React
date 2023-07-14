function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const send = document.querySelector(".send-button");
const modal = document.getElementById("contact_modal");
if (send && modal) {
    send.addEventListener("click", sendModal())
}


function sendModal() {
    const first = document.getElementById("first");
    const last = document.getElementById("last");
    const email = document.getElementById("email");
    const message = document.getElementById("message")
    console.log("Prénom :", first.value, "Nom :", last.value, "Email :", email.value, "Message:", message.value);
    modal.style.display = "none";

}