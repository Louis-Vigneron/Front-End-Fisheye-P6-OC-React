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

    let firstName  = photographer.name.split(' ')[0];
    let pictures = [];
    value.media.forEach(el => {
        if (Id == el.photographerId) {
            pictures.push(el)             
        }
    });    

    pictures.sort(byLikes);
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
            <li id="Popularité" class="sort-option sort-option-border" onclick="selectSortOption('Popularité','${encodeURIComponent(JSON.stringify(pictures))}','${encodeURIComponent(JSON.stringify(firstName))}')" role="option" aria-selected="false" aria-labelledby="sort-button">Popularité</li>
            <li id="Date" class="sort-option sort-option-border" onclick="selectSortOption('Date','${encodeURIComponent(JSON.stringify(pictures))}', '${encodeURIComponent(JSON.stringify(firstName))}')" role="option" aria-selected="false">Date</li>
            <li id="Titre" class="sort-option" onclick="selectSortOption('Titre','${encodeURIComponent(JSON.stringify(pictures))}', '${encodeURIComponent(JSON.stringify(firstName))}')" role="option" aria-selected="false">Titre</li>
        </ul>
        <i class="fa-solid fa-chevron-up"></i>
    </div>
    <div class="images-photographer"></div>
    <div class="lightBox"></div>
    <div class="total-likes">   
        <p><span class="likes-total-number">${totalLikes(pictures)}</span><i class="fa-solid fa-heart"></i> </p>
        <p>${photographer.price}€ / jour</p>
    </div>     
    
        `;
    contactForm.innerHTML = `
    <div class="modal">
    <header>
      <h2>Contactez-moi <br> ${photographer.name}</h2>
      <img src="assets/icons/close.svg" onclick="closeModal()" />
    </header>
    <form>
      <div>
        <label>Prénom</label>
        <input id="first"  name="first"/>
      </div>
      <div>
        <label >Nom</label>
        <input id="last"  name="last"/>
      </div>
      <div>
        <label>Email</label>
        <input id="email"  name="email" />
      </div>
      <div>
        <label>Votre message</label>
        <input id="message"  name="message" class="message-modal" />
      </div>
      <button class="contact_button send-button" type="button" onclick="sendModal()">Envoyer</button>
    </form>
    
  </div>`
    addPicture(pictures, firstName);      
   
}

function displaySortOptions(){   
    const listOptions = document.getElementById('sort-select');
    const button = document.getElementById('sort-button');  
    const arrowDown = document.querySelector('.fa-chevron-down');
    const expanded = listOptions.getAttribute('aria-expanded') === 'true';
    listOptions.setAttribute('aria-expanded', !expanded);
    listOptions.style.display = expanded ? 'none' : 'block';   
    button.style.display = "none"; 
    arrowDown.style.display = "none"; 
}

function selectSortOption(sortValue, picturesJSON, firstNameJSON){
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

function addPicture(pictures, firstName) {
    let images = document.querySelector('.images-photographer');
    images.innerHTML = "";
    pictures.forEach(element => {
        if (element.image) {
            let picture = new Picture(element, firstName);
            let pictureCard = new PictureCard(picture);
            let pictureCardHtml = pictureCard.createPictureCard();
            images.innerHTML += pictureCardHtml;
        }
        else {
            let video = new Video(element, firstName);
            let videoCard = new VideoCard(video);
            let videoCardHtml = videoCard.createVideoCard();
            images.innerHTML += videoCardHtml;
        }
    });
    addLike(pictures);
    displayLightBox(pictures, firstName);   
}

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
        likeBtn[y].addEventListener("keydown",(e)=>{
            if (e.key === "Enter") {
                let a = b[y].likes + 1;
                b[y].likes = a;
                likeNumber[y].innerHTML = `<span> ${a}<i tabindex="0" class="fa-solid fa-heart"></i></span></figcaption>`;
                likeTotalUpdate.textContent = totalLikes(b)
        }})

    };
}

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

function totalLikes(pictures) {
    let totalLikes = 0;
    pictures.forEach(el => {
        totalLikes += el.likes;
    });
    return totalLikes
}

function displayLightBox(pictures, firstName) {
    const picture = document.querySelectorAll(".img-photographer");
    const lightBox = document.querySelector(".lightBox");
    const totalLikesHide = document.querySelector(".total-likes");
    
    for (let x = 0; picture.length > x; x++) {
        picture[x].addEventListener("click", () => {
            lightBox.style.display = "block";
            totalLikesHide.style.display = "none";
            if (pictures[x].image) {
                displayImageCarrousel( pictures, x, firstName)
            }
            else {
                displayVideoCarrousel( pictures, x, firstName)
            }
        })      
        picture[x].addEventListener("keydown",(e)=>{
            if (e.key === "Enter") {
                lightBox.style.display = "block";
                totalLikesHide.style.display = "none";
                if (pictures[x].image) {
                    displayImageCarrousel( pictures, x, firstName)
                }
                else {
                    displayVideoCarrousel( pictures, x, firstName)
                }
        }})
    } 
   
}

function displayImageCarrousel( pictures, x, firstName) {
    const lightBox = document.querySelector(".lightBox");    
    lightBox.innerHTML = `       
            <div class="nextTo">
               <img tabindex="0" id="left" src="assets/left.svg" alt="left cross">
                <figure class="figure-carrousel">
                    <img class="img-carrousel" src="assets/${firstName}/${pictures[x].image}" alt=${pictures[x].title}>
                    <figcaption class="img-legend-carrousel">${pictures[x].title}</figcaption>
                </figure>
                <img tabindex="0" id="right" src="assets/right.svg" alt="right cross">
                <div tabindex="0" class="cross">
                    <div class="cross1"></div>
                    <div class="cross2"></div>
                </div>
            </div> 
                `;
    hideLightBox()
    Carrousel(pictures, x, firstName)
}

function displayVideoCarrousel( pictures, x, firstName) {
    const lightBox = document.querySelector(".lightBox");
    lightBox.innerHTML = `
    <div class="nextTo">
        <img tabindex="0" id="left" src="assets/left.svg" alt="left cross">
        <figure class="figure-carrousel">
            <video class="img-carrousel" controls width="350" height="300">
                <source src="assets/${firstName}/${pictures[x].video}" type="video/mp4">                            
            </video>
            <figcaption class="img-legend-carrousel">${pictures[x].title}</figcaption>
        </figure>
        <img tabindex="0" id="right" src="assets/right.svg" alt="right cross">
        <div tabindex="0" class="cross">
            <div class="cross1"></div>
            <div class="cross2"></div>
        </div>
    </div>
        `;
    hideLightBox()
    Carrousel(pictures, x, firstName)
}

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
}

function Carrousel(pictures,  x, firstName) {
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

function previousPicture( pictures, index, firstName) {
    index = (index - 1 + pictures.length) % pictures.length;
    if (pictures[index].image) {
        displayImageCarrousel(pictures, index, firstName)
    }
    else {
        displayVideoCarrousel(pictures, index, firstName)
    }
}

function nextPicture( pictures, index, firstName) {
    index = (index + 1) % pictures.length;
    if (pictures[index].image) {
        displayImageCarrousel(pictures, index, firstName)
    }
    else {
        displayVideoCarrousel(pictures, index, firstName)
    }
}







//https://achecks.org/achecker/