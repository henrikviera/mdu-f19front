// import your pages
import LoginPage from "./pages/login.js";
import HomePage from "./pages/home.js";
import PersonsPage from "./pages/persons.js";
import ProfilePage from "./pages/profile.js";
// import your services
import spaService from "./services/spa.js";
import authService from "./services/auth.js";

// Declare and init pages
let loginPage = new LoginPage();
let homePage = new HomePage();
let personsPage = new PersonsPage();
let profilePage = new ProfilePage();

// init services 
spaService.init();
authService.init();

window.pageChange = () => spaService.pageChange();
window.logout = () => profilePage.logout();
window.updateUser = () => profilePage.updateUser();
window.previewImage = (file, previewId) => profilePage.previewImage(file, previewId);