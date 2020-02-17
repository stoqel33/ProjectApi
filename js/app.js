import '../sass/style.scss';

class Dogs {

  constructor() {
    this.apiUrl = 'https://dog.ceo/api/breeds'
    this.imgEl = document.querySelector('.dog img');

    this.init();
  }

  listOfBreeds() {
    return fetch(`${this.apiUrl}/list/all`)
      .then(resp => resp.json())
      .then(data => data.message);
  }

  getRandomImage() {
    return fetch(`${this.apiUrl}/image/random`)
      .then(resp => resp.json())
      .then(data => data.message);
  }

  getRandomImageByBreeds(breed) {
    return fetch(`${this.apiUrl}/${breed}/images/random`)
      .then(resp => resp.json())
      .then(data => data.message);
  }

  init() {
    this.getRandomImage()
      .then(imgSrc => this.imgEl.setAttribute('src', imgSrc));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Dogs();
})