import { AppState } from "../AppState.js"
import { sandboxPicturesService } from "../services/SandboxPicturesService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawMyPictures() {
  const pictures = AppState.myPictures

  let template = ''

  pictures.forEach(pic => template += pic.ListTemplate)

  setHTML('myPictures', template)
}

export class SandboxPicturesController {
  constructor () {
    // console.log('sandbox controller');

    AppState.on('myPictures', _drawMyPictures)
    AppState.on('account', this.getMyPictures)
  }

  async createPicture() {
    try {
      await sandboxPicturesService.createPicture()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async getMyPictures() {
    try {
      await sandboxPicturesService.getMyPictures()
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  async deletePicture(pictureId) {
    try {

      const wantsToDelete = await Pop.confirm('Are you sure you want to delete this?')

      if (!wantsToDelete) {
        return
      }

      await sandboxPicturesService.deletePicture(pictureId)
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  setActivePicture(pictureId) {
    sandboxPicturesService.setActivePicture(pictureId)
  }

}