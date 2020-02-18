import '../sass/style.scss';

class Dogs {

  constructor() {
    this.apiUrl = 'https://dog.ceo/api'
    this.imgEl = document.querySelector('.image');
    this.backgroundEl = document.querySelector('.dog__background');
    this.tilesEl = document.querySelector('.list__tiles')

    this.init();
  }

  listOfBreeds() {
    return fetch(`${this.apiUrl}/breeds/list/all`)
      .then(resp => resp.json())
      .then(data => data.message);
  }

  getRandomImage() {
    return fetch(`${this.apiUrl}/breeds/image/random`)
      .then(resp => resp.json())
      .then(data => data.message);
  }

  getRandomImageByBreeds(breed) {
    return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
      .then(resp => resp.json())
      .then(data => data.message);
  }


  init() {
    this.getRandomImage()
      .then(imgSrc => {
        this.imgEl.setAttribute('src', imgSrc);
        this.backgroundEl.style.backgroundImage = `url("${imgSrc}")`;
        this.backgroundEl.style.backgroundSize = 'cover';
      });

    this.showListBreeds();
  }

  addBreed(breed, subBreed) {
    let name;
    let type;

    if (typeof subBreed !== 'undefined') {
      name = `${breed} ${subBreed}`;
      type = `${breed}/${subBreed}`;
    }
    else {
      name = breed;
      type = breed;
    }

    const tile = document.createElement('div');
    tile.classList.add('list__tile');
    tile.textContent = name;

    tile.addEventListener('click', () => {
      this.getRandomImageByBreeds(type)
        .then(imgSrc => {
          this.imgEl.setAttribute('src', imgSrc);
          this.backgroundEl.style.backgroundImage = `url("${imgSrc}")`;
          this.backgroundEl.style.backgroundSize = 'cover';
        });
    })

    this.tilesEl.appendChild(tile)
  }

  showListBreeds() {
    this.listOfBreeds()
      .then(breeds => {
        for (const breed in breeds) {
          if (breeds[breed].length === 0) {
            this.addBreed(breed)
          }
          else {
            for (const subBreed of breeds[breed]) {
              this.addBreed(breed, subBreed)
            }
          }
        }
      })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Dogs();
})