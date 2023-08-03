export class PhotographerCard {
    constructor(photographer) {
        this.photographer = photographer
    }

    createPhotographerCard() {
        const photographerCard = `
            <a href="./photographer.html?${this.photographer.Id}">
                <article>
                    <img src="assets/photographers/${this.photographer.Portrait}" alt="${this.photographer.Name}">
                    <h2>${this.photographer.Name}</h2>
                    <h3>${this.photographer.City}, ${this.photographer.Country}</h3>
                    <p>${this.photographer.TagLine}</p><span>${this.photographer.Price}€/jour</span>
                </article>
            </a>
        
        `
        return photographerCard
    }
}

