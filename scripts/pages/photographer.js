//Retrieving the id contained in the URL
const search_id = window.location.search;
const Id = search_id.slice(1);


fetch("../../data/photographers.json")

    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        displayPhotographerPage(value);
    })
    .catch(function (err) {
        console.log(err);
    });


import { PictureFactory } from "../factories/PicturesFactory.js";
import { Card } from "../templates/createCard.js";

// function to display all the elements of the photographer page
function displayPhotographerPage(value) {

    //retrieval of photographer information
    let photographer = [];

    value.photographers.forEach(el => {
        if (Id == el.id) {
            photographer = el
        }
    });

    // firstname recovery
    let firstName = photographer.name.split(' ')[0];

    //recovery of photographer's photos
    let pictures = [];
    value.media.forEach(el => {
        if (Id == el.photographerId) {
            pictures.push(el)
        }
    });

    pictures.sort(byLikes);

    //display of page elements
    const headerPhotographe = document.querySelector('#main');
    const contactForm = document.querySelector('#contact_modal');
    const portrait = photographer.portrait;
    const picture = `assets/photographers/${portrait}`;

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
    
    <div class="sort">
        <h2 class="sort-title">Trier par</h2>
        <button class="sort-button" id="sort-button" aria-haspopup="listbox" role="button" aria-expanded="false" onclick="displaySortOptions()">Popularité </button><i class="fa-solid fa-chevron-down"></i>
        <ul class="sort-select" id="sort-select">
            <li id="Popularité" class="sort-option-border" onclick="selectSortOption('Popularité','${encodeURIComponent(JSON.stringify(pictures))}','${encodeURIComponent(JSON.stringify(firstName))}')" role="option" aria-selected="false" aria-labelledby="sort-button"><button class="sort-option">Popularité</button> </li>
            <li id="Date" class="sort-option-border" onclick="selectSortOption('Date','${encodeURIComponent(JSON.stringify(pictures))}', '${encodeURIComponent(JSON.stringify(firstName))}')" role="option" aria-selected="false"><button class="sort-option">Date</button></li>
            <li id="Titre" onclick="selectSortOption('Titre','${encodeURIComponent(JSON.stringify(pictures))}', '${encodeURIComponent(JSON.stringify(firstName))}')" role="option" aria-selected="false"><button class="sort-option">Titre</button></li>
        </ul>
        <i class="fa-solid fa-chevron-up"></i>
    </div>
    <div class="images-photographer"></div>
    <div class="lightBox"></div>
    <div class="total-likes">   
        <p><span class="likes-total-number">${totalLikes(pictures)}</span><i class="fa-solid fa-heart heart-likes"></i> </p>
        <p>${photographer.price}€ / jour</p>
    </div>     
    
        `;
    contactForm.innerHTML = `
    <div class="modal">
    <header>
      <h2>Contactez-moi <br> ${photographer.name}</h2>
      <img class="modal-close" src="assets/icons/close.svg" tabindex="0" onclick="closeModal()" onkeypress="handleKeyPress(event)" alt="Bouton fermer" />
    </header>
    <form method="get" >
      <div class="modal__form">
        <label class="modal__label" for="prénom">Prénom</label><p  class="modal__error" id="firstNameErrorMsg"></p>
        <input type="text" id="first" name="prénom" aria-labelledby="Prénom"/>
      </div>
      <div class="modal__form">
        <label class="modal__label"  for="nom">Nom</label><p  class="modal__error" id="lastNameErrorMsg"></p>
        <input type="text" id="last" name="nom" aria-labelledby="Nom"/>
      </div>
      <div class="modal__form">
        <label class="modal__label"  for="email">Email</label><p  class="modal__error" id="emailErrorMsg"></p>
        <input type="email" id="email" name="email" aria-labelledby="Email"/>
      </div>
      <div class="modal__form">
        <label class="modal__label"  for="message">Votre message</label><p id="messageErrorMsg" class="modal__error"></p>
        <input type="text" id="message" name="message" class="message-modal" aria-labelledby="Votre message"/>
      </div>
      <button class="contact_button send-button" type="button" onclick="sendModal()">Envoyer</button>
    </form>
    
  </div>`
    addPicture(pictures, firstName);
} 

//function to display pictures and videos of the photographer
function addPicture(pictures, firstName) {
    let images = document.querySelector('.images-photographer');
    images.innerHTML = "";
    pictures.forEach(element => {        
        let newData = new PictureFactory(element, firstName)
        let newCard = new Card(newData)
        let newCardHtml = newCard.createCard()
        images.innerHTML += newCardHtml
    });
    addLike(pictures);
    displayLightBox(pictures, firstName);
}

//function to add a like to the pictures and videos
function addLike(pictures) {
    let likeBtn = document.querySelectorAll(".fa-heart");
    let likeNumber = document.querySelectorAll("span");
    let likeTotalUpdate = document.querySelector(".likes-total-number")
    let b = JSON.parse(JSON.stringify(pictures));
    likeTotalUpdate.textContent = totalLikes(pictures);
    for (let y = 0; y < likeBtn.length; y++) {
        likeBtn[y].addEventListener("click", () => {
            let a = b[y].likes + 1;
            b[y].likes = a;
            likeNumber[y].innerHTML = `<span> ${a}<i tabindex="0" class="fa-solid fa-heart"></i></span></figcaption>`;
            likeTotalUpdate.textContent = totalLikes(b)
        })
        likeBtn[y].addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                let a = b[y].likes + 1;
                b[y].likes = a;
                likeNumber[y].innerHTML = `<span> ${a}<i tabindex="0" class="fa-solid fa-heart"></i></span></figcaption>`;
                likeTotalUpdate.textContent = totalLikes(b)
            }
        })

    }
}

// function to display sort option 
function displaySortOptions() {
    const listOptions = document.getElementById('sort-select');
    const button = document.getElementById('sort-button');
    const arrowDown = document.querySelector('.fa-chevron-down');
    const expanded = listOptions.getAttribute('aria-expanded') === 'true';
    listOptions.setAttribute('aria-expanded', !expanded);
    listOptions.style.display = expanded ? 'none' : 'block';
    button.style.display = "none";
    arrowDown.style.display = "none";
}

//function to select sort option 
function selectSortOption(sortValue, picturesJSON, firstNameJSON) {
    const listOptions = document.getElementById('sort-select');
    const options = document.querySelectorAll('[role="option"]');
    const button = document.getElementById('sort-button');
    const arrowDown = document.querySelector('.fa-chevron-down');
    const expanded = listOptions.getAttribute('aria-expanded') === 'true';
    listOptions.setAttribute('aria-expanded', !expanded);
    options.forEach(el => {
        let isSelected = el.id === sortValue;
        el.setAttribute('aria-selected', isSelected);

    });

    const menuButton = document.getElementById('sort-button');
    let selectedOption = listOptions.querySelector('[aria-selected="true"]').textContent;
    menuButton.textContent = selectedOption;
    listOptions.style.display = expanded ? 'none' : 'block';
    button.style.display = "block";
    arrowDown.style.display = "block";
    const decodedPicturesJSON = decodeURIComponent(picturesJSON);
    const pictures = JSON.parse(decodedPicturesJSON);
    const decodedFirstNameJSON = decodeURIComponent(firstNameJSON);
    const firstName = JSON.parse(decodedFirstNameJSON);
    sort(selectedOption, pictures, firstName)
}

//function according to the chosen option 
 function sort(options, pictures, firstName) {

    if (options == "Popularité") {
        pictures.sort(byLikes);
        addPicture(pictures, firstName);
    }
    if (options == "Date") {
        pictures.sort(byDate);
        addPicture(pictures, firstName);
    }
    if (options == "Titre") {
        pictures.sort(byName);
        addPicture(pictures, firstName);
    }
}

//function sort by like
function byLikes(a, b) {
    if (a.likes > b.likes) {
        return -1;
    } else if (b.likes > a.likes) {
        return 1;
    } else {
        return 0;
    }
}

//function sort by name
function byName(a, b) {
    if (a.title > b.title) {
        return 1;
    } else if (b.title > a.title) {
        return -1;
    } else {
        return 0;
    }
}

//function sort by date
function byDate(a, b) {
    if (a.date > b.date) {
        return -1;
    } else if (b.date > a.date) {
        return 1;
    } else {
        return 0;
    }
}

//function to display and calculate total likes
function totalLikes(pictures) {
    let totalLikes = 0;
    pictures.forEach(el => {
        totalLikes += el.likes;
    });
    return totalLikes
}

//function to display the lightbox 
function displayLightBox(pictures, firstName) {
    const picture = document.querySelectorAll(".img-photographer");
    const lightBox = document.querySelector(".lightBox");
    const totalLikesHide = document.querySelector(".total-likes");
    lightBox.setAttribute("tabindex", "0");

    for (let x = 0; picture.length > x; x++) {
        picture[x].addEventListener("click", () => {
            lightBox.style.display = "block";
            totalLikesHide.style.display = "none";
            if (pictures[x].image) {
                displayImageCarrousel(pictures, x, firstName)
            }
            else {
                displayVideoCarrousel(pictures, x, firstName)
            }
            lightBox.focus();
        })
        picture[x].addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                lightBox.style.display = "block";
                totalLikesHide.style.display = "none";
                if (pictures[x].image) {
                    displayImageCarrousel(pictures, x, firstName)
                }
                else {
                    displayVideoCarrousel(pictures, x, firstName)
                }
                lightBox.focus();
            }
        })

    }

}

//function to display images in lightbox
function displayImageCarrousel(pictures, x, firstName) {
    const lightBox = document.querySelector(".lightBox");
    lightBox.innerHTML = `       
            <div class="nextTo">
            <button class="button-carrousel" id="left"><img  src="assets/left.svg" alt="flèche de gauche"></button>
               
                <figure class="figure-carrousel">
                    <img class="img-carrousel" src="assets/${firstName}/${pictures[x].image}" alt=${pictures[x].title}>
                    <figcaption class="img-legend-carrousel">${pictures[x].title}</figcaption>
                </figure>
                <button class="button-carrousel" id="right"><img  src="assets/right.svg" alt="flèche de droite"></button>
                
                <div tabindex="0" aria-label="Bouton fermer lightbox" class="cross">
                <div class="cross1"></div>
                <div class="cross2"></div>
            </div>
                
            </div> 
                `;
    hideLightBox()
    Carrousel(pictures, x, firstName)
}

//function to display videos in lightbox
function displayVideoCarrousel(pictures, x, firstName) {
    const lightBox = document.querySelector(".lightBox");
    lightBox.innerHTML = `
    <div class="nextTo">
    <button class="button-carrousel" id="left"><img  src="assets/left.svg" alt="flèche de gauche"></button>
        <figure class="figure-carrousel">
            <video class="img-carrousel" controls width="350" height="300">
                <source src="assets/${firstName}/${pictures[x].video}" type="video/mp4">                            
            </video>
            <figcaption class="img-legend-carrousel">${pictures[x].title}</figcaption>
        </figure>
        <button class="button-carrousel" id="right"><img  src="assets/right.svg" alt="flèche de droite"></button>
        <div tabindex="0" aria-label="Bouton fermer lightbox" class="cross">
            <div class="cross1"></div>
            <div class="cross2"></div>
        </div>
    </div>
        `;
    hideLightBox()
    Carrousel(pictures, x, firstName)
}

//function to hide the lightbox
function hideLightBox() {
    const cross = document.querySelector(".cross");
    const lightBox = document.querySelector(".lightBox");
    const totalLikesDisplay = document.querySelector(".total-likes");
    cross.addEventListener("click", () => {
        lightBox.style.display = "none";
        totalLikesDisplay.style.display = "flex";
    })
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            lightBox.style.display = "none";
            totalLikesDisplay.style.display = "flex";
        }
    })
    document.addEventListener('keyup', (e) => {
        if (e.key === "Enter") {
            const focusedElement = document.activeElement
            if (focusedElement.classList.contains("cross")) {
                lightBox.style.display = "none";
                totalLikesDisplay.style.display = "flex";
            }

        }
    })
}

//function to manage the carousel
function Carrousel(pictures, x, firstName) {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    let index = x;

    left.addEventListener('click', () => {
        previousPicture(pictures, index, firstName)
    })
    right.addEventListener('click', () => {
        nextPicture(pictures, index, firstName)
    })
    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft") {
            previousPicture(pictures, index, firstName)
        } else if (e.key === "ArrowRight") {
            nextPicture(pictures, index, firstName)
        }
    })
}

//function to display the previous image
function previousPicture(pictures, index, firstName) {
    index = (index - 1 + pictures.length) % pictures.length;
    if (pictures[index].image) {
        displayImageCarrousel(pictures, index, firstName)
    }
    else {
        displayVideoCarrousel(pictures, index, firstName)
    }
}

//function to display the next image
function nextPicture(pictures, index, firstName) {
    index = (index + 1) % pictures.length;
    if (pictures[index].image) {
        displayImageCarrousel(pictures, index, firstName)
    }
    else {
        displayVideoCarrousel(pictures, index, firstName)
    }
}
