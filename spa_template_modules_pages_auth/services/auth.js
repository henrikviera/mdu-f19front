import spaService from "./spa.js";
import loaderService from "./loader.js";
import movieService from "./movie.js";

class AuthService {
    constructor() {
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.userRef = _db.collection("users");
        this.spaService = spaService;
        this.loaderService = loaderService;
        this.authUser;
    }

    init() {
        // Listen on authentication state change
        firebase.auth().onAuthStateChanged(user => {
            if (user) { // if user exists and is authenticated
                this.userAuthenticated(user);
            } else { // if user is not logged in
                this.userNotAuthenticated();
            }
        });
    }

    userAuthenticated(user) {
        this.appendAuthUser();
        this.spaService.hideTabbar(false);
        movieService.init();
        this.loaderService.show(false);
    }

    userNotAuthenticated() {
        this.spaService.hideTabbar(true);
        this.spaService.navigateTo("login");

        // Firebase UI configuration
        const uiConfig = {
            credentialHelper: firebaseui.auth.CredentialHelper.NONE,
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInSuccessUrl: '#home'
        };
        this.ui.start('#firebaseui-auth-container', uiConfig);
    }

    logout() {
        firebase.auth().signOut();
    }

    async getAuthUser() {
        let authUser = firebase.auth().currentUser;


        let dbUser = await this.userRef.doc(authUser.uid).get().then(doc => doc.data());
        let user = {
            ...authUser,
            ...dbUser
        };
        this.authUser = user;
        return user;
    }

    async appendAuthUser() {
        let user = await this.getAuthUser();
        document.querySelector('#name').value = user.displayName || "";
        document.querySelector('#mail').value = user.email;
        document.querySelector('#birthdate').value = user.birthdate || "";
        document.querySelector('#hairColor').value = user.hairColor || "";
        document.querySelector('#imagePreview').src = user.img || "";
        document.querySelector('#phone').value = user.phone || "";
    }

    updateAuthUser(name, img, birthdate, hairColor, phone) {
        this.loaderService.show(true);

        let user = firebase.auth().currentUser;

        // update auth user
        user.updateProfile({
            displayName: name
        });

        // update database user
        this.userRef.doc(user.uid).set({
            img: img,
            birthdate: birthdate,
            hairColor: hairColor,
            phone: phone
        }, {
            merge: true
        }).then(() => {
            this.loaderService.show(false);
        });

    }
    authUserHasFav(favMovieId) {
        if (this.authUser.favMovies && this.authUser.favMovies.includes(favMovieId)) {
            return true;
        } else {

            return false;
        }
    }
}

const authService = new AuthService();
export default authService;