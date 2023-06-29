import { AppState } from "../AppState.js"
import { Picture } from "../models/Picture.js";
import { api } from "./AxiosService.js"

class SandboxPicturesService {
  async deletePicture(pictureId) {
    const res = await api.delete(`api/apods/${pictureId}`)

    console.log('deleted picture', res.data);

    const picIndex = AppState.myPictures.findIndex(pic => pic.id == pictureId)

    if (picIndex == -1) {
      throw new Error("INVALID ID")
    }

    AppState.myPictures.splice(picIndex, 1)

    AppState.emit('myPictures')
  }
  setActivePicture(pictureId) {
    const foundPicture = AppState.myPictures.find(pic => pic.id == pictureId)

    if (!foundPicture) {
      return
    }

    AppState.picture = foundPicture
  }
  async createPicture() {
    const picture = AppState.picture

    const res = await api.post('api/apods', picture)

    console.log('created picture', res.data);

    const newPicture = new Picture(res.data)

    AppState.myPictures.push(newPicture)

    AppState.emit('myPictures')

  }
  async getMyPictures() {
    const res = await api.get('api/apods')

    console.log('got my pictures', res.data);

    const newPictures = res.data.map(picturePojo => new Picture(picturePojo))

    AppState.myPictures = newPictures
  }

}

export const sandboxPicturesService = new SandboxPicturesService()