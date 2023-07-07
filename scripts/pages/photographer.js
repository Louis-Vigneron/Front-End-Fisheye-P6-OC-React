//Récupération du numéro de commande contenu dans l'URL

const search_id = window.location.search;
const Id = search_id.slice(1);

fetch("../../data/photographers.json")

    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        console.table(value);
        displayPhotographer(value);
    })
    .catch(function (err) {
        console.log(err);
    });


function displayPhotographer(value) {

    let photographer = [];

    value.photographers.forEach(el => {
        if (Id == el.id) {
            photographer = el
        }
    });

    let pictures = [];
    value.media.forEach(el => {
        if (Id == el.photographerId) {
            pictures.push(el);
        }
    });

    const headerPhotographe = document.querySelector('.photograph-header');
    const portrait = photographer.portrait;
    const picture = `assets/photographers/${portrait}`;

    headerPhotographe.innerHTML =
        `
    <div>
        <h2>${photographer.name}</h2>
        <h3>${photographer.city}, ${photographer.country}</h3>
        <p>${photographer.tagline}</p>
    </div>    
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <img src=${picture} alt=${photographer.name}>

    `
        ;


}