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

    let firstName = photographer.name.split(' ')[0];
    let pictures = [];
    let videos = [];
    value.media.forEach(el => {
        if (Id == el.photographerId) {
            if (el.image) {
                pictures.push(el);
            } else {
                videos.push(el)
            }
        }
    });
    pictures.sort(byLikes);
    const headerPhotographe = document.querySelector('#main');
    const portrait = photographer.portrait;
    const picture = `assets/photographers/${portrait}`;
    let totalLikes = 0;
    pictures.forEach(el => {
        totalLikes += el.likes;
    });

    headerPhotographe.innerHTML =
        `
    
    <div class="photograph-header">
        <div>
            <h2>${photographer.name}</h2>
            <h3>${photographer.city}, ${photographer.country}</h3>
            <p>${photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <img src=${picture} alt=${photographer.name}>
    </div>
    
    <label class="sort" for="sort">Trier par</label>
    <select class="sort-select" name="sort" id="sort-select">
        <option value="Popularité">Popularité</option>
        <option value="Date">Date</option>
        <option value="Titre">Titre</option>
    </select>
    <div class="images-photographer">
    
    </div>
    <div class="total-likes">
        <p>${totalLikes} <i class="fa-solid fa-heart"></i></p>
        <p>${photographer.price}€ / jour</p>
    </div>     
    
        `;
    addLike()
    sort(pictures, videos, firstName)
    addPicture(pictures, videos, firstName)
}

function addPicture(pictures, videos, firstName) {
    let images = document.querySelector('.images-photographer');
    images.innerHTML = `
    ${pictures.map(el => {
        return `<figure>
                <img class="img-photographer" src="assets/${firstName}/${el.image}" alt=${el.title}>
                <figcaption class="img-legend">${el.title}<span> ${el.likes}<i class="fa-solid fa-heart"></i></span></figcaption>
            </figure>`;
    }).join('')}
    ${videos.map(el => {
        return `
               <figure>
                    <video class="video-photographer" controls width="350" height="300">
                        <source src="assets/${firstName}/${el.video}" type="video/mp4">                            
                    </video>
                    <figcaption class="img-legend">${el.title}<span> ${el.likes}<i class="fa-solid fa-heart"></i></span></figcaption>
                </figure>
            `;
    }).join('')}
    `
}

function addLike() {
    let likeBtn = document.querySelectorAll(".fa-heart");
    let likeNumber = document.querySelectorAll("span");

    for (let y = 0; y < likeBtn.length; y++) {
        likeBtn[y].addEventListener("click", (e) => {
            let a = parseInt(likeNumber[y].textContent) + 1;
            console.log(a)
        })

    };
}

function sort(array, videos, firstName) {
    let optionPick = document.querySelector("#sort-select");
    optionPick.addEventListener("change", (e) => {
        if (optionPick.value == "Popularité") {
            array.sort(byLikes);
            addPicture(array, videos, firstName);
        }
        if (optionPick.value == "Date") {
            array.sort(byDate);
            addPicture(array, videos, firstName);
        }
        if (optionPick.value == "Titre") {
            array.sort(byName);
            addPicture(array, videos, firstName);
        }
    })



}

function byLikes(a, b) {
    if (a.likes > b.likes) {
        return -1;
    } else if (b.likes > a.likes) {
        return 1;
    } else {
        return 0;
    }
}

function byName(a, b) {
    if (a.title > b.title) {
        return 1;
    } else if (b.title > a.title) {
        return -1;
    } else {
        return 0;
    }
}

function byDate(a, b) {
    if (a.date > b.date) {
        return -1;
    } else if (b.date > a.date) {
        return 1;
    } else {
        return 0;
    }
}

