export class Video {
    constructor(data, firstName) {
        const { id, photographerId, title, likes, price, date, video } = data;
        this.Title = title
        this.Id = id
        this.PhotographerId = photographerId
        this.Likes = likes
        this.Price = price
        this.Date = date
        this.Video = video
        this.FirstName = firstName
    }
}