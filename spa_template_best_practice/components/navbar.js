export default class HomePage {
  constructor() {
    this.template();
  }


  template() {
    document.querySelector("#app").innerHTML += /*html*/ `
      <nav class="tabbar">
      <a href="#home">homepage</a>
      <a href="#persons">Persons </a>


      </nav>
    `;
  }
}