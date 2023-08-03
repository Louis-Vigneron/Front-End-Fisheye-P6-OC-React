import { Picture } from "../templates/pictures.js";
import { Video } from "../templates/video.js";

export class PictureFactory {
    constructor(data, firstName) {
        if (data.image) {
            return new Picture(data, firstName)         
        } else if (data.video) {
            return new Video(data, firstName)            
        } else {
            throw 'Unknown type format'
        }
    }
}