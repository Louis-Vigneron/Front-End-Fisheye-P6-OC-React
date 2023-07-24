class Picture{
    constructor(data, firstName){
        const { id, photographerId, title, image, likes, price, date } = data;
        this.Title = title
        this.Id = id
        this.PhotographerId = photographerId
        this.Image = image
        this.Likes = likes
        this.Price = price
        this.Date = date
        this.FirstName = firstName
    }
}
class PictureCard {
    constructor(picture){
        this.picture = picture  
    }

    createPictureCard(){      
        const pictureCard = `
        <figure >
            <img tabindex="0" class="img-photographer" src="assets/${this.picture.FirstName}/${this.picture.Image}" alt=${this.picture.Title}>
            <figcaption class="img-legend">${this.picture.Title}<span class="likes-number"> ${this.picture.Likes}<i aria-label="Bouton j'aime" tabindex="0" class="fa-solid fa-heart"></i></span></figcaption>
        </figure>
    `
    return pictureCard
    }    
}

class Video{
    constructor(data, firstName){
        const { id, photographerId, title, likes, price, date, video} = data;
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


class VideoCard {
    constructor(video){
        this.data = video  
    }

    createVideoCard(){      
        const videoCard = `
        <figure>
             <video tabindex="0" class="img-photographer" controls width="350" height="300">
                 <source src="assets/${this.data.FirstName}/${this.data.Video}" type="video/mp4">                            
             </video>
             <figcaption class="img-legend">${this.data.Title}<span class="likes-number"> ${this.data.Likes}<i aria-label="Bouton j'aime" tabindex="0" class="fa-solid fa-heart"></i></span></figcaption>
         </figure>
    `
    return videoCard
    }    
}