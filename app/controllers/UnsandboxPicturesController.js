import { AppState } from "../AppState.js";
import { unsandboxPicturesService } from "../services/UnsandboxPicturesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawPicture() {
  const picture = AppState.picture

  const htmlBody = document.body

  htmlBody.style.backgroundImage = `url(${picture.imgUrl})`

  setHTML('pictureDetails', picture.DetailsTemplate)
}


export class UnsandboxPicturesController {
  constructor () {
    // console.log('unsandbox loaded');
    this.getRandomPicture()

    AppState.on('picture', _drawPicture)
  }

  async getRandomPicture() {
    try {
      unsandboxPicturesService.getRandomPicture()
    } catch (error) {
      Pop.error(error.message)
      console.error(error);
    }
  }

  async getRandomPictureByQuery(event) {
    try {
      // REVIEW no refresh!
      event.preventDefault()

      let form = event.target

      let formData = getFormData(form)

      console.log('form data!', formData);

      unsandboxPicturesService.getRandomPictureByQuery(formData)
    } catch (error) {
      Pop.error(error.message)
      console.error(error);
    }
  }
}