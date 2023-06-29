import { AppState } from "../AppState.js";
import { Picture } from "../models/Picture.js";
import { unsandboxApi } from "./AxiosService.js"

class UnsandboxPicturesService {
  async getRandomPicture() {
    const res = await unsandboxApi.get('api/images/random')
    console.log('got random picture', res.data);

    const newPicture = new Picture(res.data)

    AppState.picture = newPicture
  }

  async getRandomPictureByQuery(formData) {
    const res = await unsandboxApi.get(`api/images/random?query=${formData.search}`)
    console.log('got picture with query', res.data);

    const newPicture = new Picture(res.data)

    AppState.picture = newPicture
  }
}

export const unsandboxPicturesService = new UnsandboxPicturesService()