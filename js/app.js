import '../sass/style.scss';

class Dogs {

  constructor() {
    this.apiUrl = 'https://dog.ceo/api'
    this.imgEl = document.querySelector('.image');
    this.backgroundEl = document.querySelector('.dog__background');
    this.tilesEl = document.querySelector('.list__tiles');
    this.nameEl = document.querySelector('.dog__title');

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
      .then(img => this.showReadyImage(img));

    this.showListBreeds();
  }

  showReadyImage(img) {
    this.imgEl.setAttribute('src', img);
    this.backgroundEl.style.backgroundImage = `url("${img}")`;
    this.backgroundEl.style.backgroundSize = 'cover';
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

    tile.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo(0, 0)
      this.getRandomImageByBreeds(type)
        .then(img => this.showReadyImage(img));

      this.nameEl.textContent = name;

      tile.classList.add('active');
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