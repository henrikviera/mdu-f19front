class PersonService {
  constructor() {}

  async loadPersons() {
    let response = await fetch("https://randomuser.me/api/?results=9");
    let jsonData = await response.json();
    return jsonData.results;
  }
}

const personService = new PersonService();
export default personService;