export class Card {
    constructor(data) {
        this.data = data
       
    }

    createCard() {
        if (this.data.Video) {            
            const videoCard = `
        <figure>
             <video tabindex="0" class="img-photographer" controls width="350" height="300">
                 <source src="assets/${this.data.FirstName}/${this.data.Video}" type="video/mp4">                            
             </video>
             <figcaption class="img-legend">${this.data.Title}<span class="likes-number"> ${this.data.Likes}<i aria-label="Bouton j'aime" tabindex="0" class="fa-solid fa-heart"></i></span></figcaption>
         </figure>
    `
            return videoCard
        } else {
           
            const pictureCard = `
            <figure >
                <img tabindex="0" class="img-photographer" src="assets/${this.data.FirstName}/${this.data.Image}" alt=${this.data.Title}>
                <figcaption class="img-legend">${this.data.Title}<span class="likes-number"> ${this.data.Likes}<i aria-label="Bouton j'aime" tabindex="0" class="fa-solid fa-heart"></i></span></figcaption>
            </figure>
        `
            return pictureCard
        }
    }
}
