export class Photographer {
    constructor(data) {
        const { name, portrait, city, country, tagline, price, id } = data;
        this.Name = name
        this.Id = id
        this.City = city
        this.Country = country
        this.TagLine = tagline
        this.Price = price
        this.Portrait = portrait
    }
}



