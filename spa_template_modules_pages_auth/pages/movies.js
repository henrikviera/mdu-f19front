export default class MoviePage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="movies" class="page">
        <header class="topbar">
          <h2>Movies</h2>
        </header>
        <section id="movie-container" class="grid-container"></section>
      </section>
    `;
  }
}