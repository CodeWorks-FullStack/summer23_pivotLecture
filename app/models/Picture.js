export class Picture {
  constructor (data) {
    // NOTE this id comes from the BCW sandbox
    this.id = data._id || ''

    this.date = data.date ? new Date(data.date) : new Date(data.created_at)

    // NOTE this id comes from the unsplash API
    this.originalId = data.slug || data.originalId
    this.color = data.color || '#000000'
    this.description = data.description || ''
    this.altDescription = data.alt_description || ''
    this.imgUrl = data.imgUrl || data.urls.regular
    this.author = data.user || data.author
  }

  get DetailsTemplate() {
    return `
    <div class="col-8 text-center m-auto">
      <div class="text-shadow dark-card" style="border-color: ${this.color};">
        <h1>${this.date.toLocaleDateString()}</h1>
        <div class="on-hover">
          <h2>${this.description}</h2>
          <h3>${this.altDescription}</h3>
          <div class="d-flex justify-content-around">
            <a href="https://unsplash.com/photos/${this.originalId}" target="_blank">
              <button class="btn btn-light">
                <i class="mdi mdi-camera"></i>
              </button>
            </a>  
              
            <button onclick="app.SandboxPicturesController.createPicture()" class="btn btn-light" title="Save this picture to your favorites! 😉">
              <i class="mdi mdi-heart"></i>
            </button>
          </div>
          <div class="d-flex justify-content-center text-shadow">
            <img src="${this.author.profile_image.small}" alt="${this.author.name}">
            <h4>${this.author.name}</h4>
          </div>
        </div>
      </div>
    </div>
    `
  }

  get ListTemplate() {
    return `
    <div class="col-12 mb-3">
      <img onclick="app.SandboxPicturesController.setActivePicture('${this.id}')" class="img-fluid rounded elevation-4 selectable" role="button" src="${this.imgUrl}" alt="${this.description}">
      <button onclick="app.SandboxPicturesController.deletePicture('${this.id}')" class="btn btn-danger">Delete Picture</button>
    </div>
    `
  }
}

