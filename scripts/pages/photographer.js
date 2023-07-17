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
    
    <label class="sort" for="sort">Trier par</label>
    <select class="sort-select" name="sort" id="sort-select">
        <option value="Popularité">Popularité</option>
        <option value="Date">Date</option>
        <option value="Titre">Titre</option>
    </select>
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
    sort(pictures, firstName);
    addPicture(firstName, pictures);    
    
}

function addPicture(firstName, pictures) {
    let images = document.querySelector('.images-photographer');
    images.innerHTML = "";
    pictures.forEach(element => {
        if (element.image) {
            images.innerHTML += `<figure>
        <img class="img-photographer" src="assets/${firstName}/${element.image}" alt=${element.title}>
        <figcaption class="img-legend">${element.title}<span class="likes-number"> ${element.likes}<i class="fa-solid fa-heart"></i></span></figcaption>
    </figure>`;
        }
        else {
            images.innerHTML += `
        <figure>
             <video class="img-photographer" controls width="350" height="300">
                 <source src="assets/${firstName}/${element.video}" type="video/mp4">                            
             </video>
             <figcaption class="img-legend">${element.title}<span class="likes-number"> ${element.likes}<i class="fa-solid fa-heart"></i></span></figcaption>
         </figure>
     `;
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
            likeNumber[y].innerHTML = `<span> ${a}<i class="fa-solid fa-heart"></i></span></figcaption>`;
            likeTotalUpdate.textContent = totalLikes(b)
        })

    };
}

function sort(pictures, firstName) {
    let optionPick = document.querySelector("#sort-select");
    optionPick.addEventListener("change", () => {
        if (optionPick.value == "Popularité") {
            pictures.sort(byLikes);
            addPicture(firstName, pictures);
        }
        if (optionPick.value == "Date") {
            pictures.sort(byDate);
            addPicture(firstName, pictures);
        }
        if (optionPick.value == "Titre") {
            pictures.sort(byName);
            addPicture(firstName, pictures);
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

function totalLikes(pictures) {
    let totalLikes = 0;
    pictures.forEach(el => {
        totalLikes += el.likes;
    });
    return totalLikes
}

function displayLightBox(pictures, firstName){
    const picture = document.querySelectorAll(".img-photographer");
    const lightBox = document.querySelector(".lightBox");
    const totalLikesHide = document.querySelector(".total-likes");
    for(let x = 0; picture.length > x; x ++) {   
        picture[x].addEventListener("click",()=>{               
        lightBox.style.display = "block";    
        totalLikesHide.style.display = "none"; 
        if (pictures[x].image) {
        
            lightBox.innerHTML = `       
            <div class="nextTo">
                <img id="right" src="assets/right.svg" alt="right cross">
                <figure class="figure-carrousel">
                    <img class="img-carrousel" src="assets/${firstName}/${pictures[x].image}" alt=${pictures[x].title}>
                    <figcaption class="img-legend-carrousel">${pictures[x].title}</figcaption>
                </figure>
                <img id="left" src="assets/left.svg" alt="left cross">
                <div class="cross">
                    <div class="cross1"></div>
                    <div class="cross2"></div>
                </div>
            </div> 
                `;
            hideLightBox()
            Carrousel(x)
        }
        else {                        
            lightBox.innerHTML = `
            <div class="nextTo">
                <img id="right" src="assets/right.svg" alt="right cross">
                <figure class="figure-carrousel">
                    <video class="img-carrousel" controls width="350" height="300">
                        <source src="assets/${firstName}/${pictures[x].video}" type="video/mp4">                            
                    </video>
                    <figcaption class="img-legend-carrousel">${pictures[x].title}</figcaption>
                </figure>
                <img id="left" src="assets/left.svg" alt="left cross">
                <div class="cross">
                    <div class="cross1"></div>
                    <div class="cross2"></div>
                </div>
            </div>
                `;
            hideLightBox()  
            Carrousel(x)
        }
     })}       
        
}

function hideLightBox(){
    const cross = document.querySelector(".cross");
    const lightBox = document.querySelector(".lightBox");    
    const totalLikesDisplay = document.querySelector(".total-likes");
    cross.addEventListener("click",()=>{
        lightBox.style.display = "none";  
        totalLikesDisplay.style.display = "flex"; 
    })
}

function Carrousel(x){
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    left.addEventListener('click',()=>{
        console.log(x)
        console.log("droite")
    })
    right.addEventListener('click',()=>{
        console.log("gauche")
    })
}