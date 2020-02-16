import authService from "./auth.js";

class MovieService {
    constructor() {
        this.movieRef = _db.collection("movies");
    }
    init() {
        // init all movies
        this.movieRef.onSnapshot(snapshotData => {
            let movies = [];
            snapshotData.forEach(doc => {
                let movie = doc.data();
                movie.id = doc.id;
                movies.push(movie);
            });
            this.appendMovies(movies);
        });

    }

    appendMovies(movies) {
        let htmlTemplate = "";
        for (let movie of movies) {
            htmlTemplate += `
            <article>
              <h2>${movie.title} (${movie.year})</h2>
              <img src="${movie.img}">
              <p>${movie.description}</p>
              ${this.generateFavMovieButton(movie.id)}
            </article>
          `;
        }
        document.querySelector('#movie-container').innerHTML = htmlTemplate;
    }

    generateFavMovieButton(movieId) {
        let btnTemplate = `
          <button onclick="addToFavourites('${movieId}')">Add to favourites</button>`;
        if (authService.authUserHasFav(movieId)) {
            btnTemplate = `
            <button onclick="removeFromFavourites('${movieId}')" class="rm">Remove from favourites</button>`;
        }
        return btnTemplate;
    }

    // adds a given movieId to the favMovies array inside _currentUser
    addToFavourites(movieId) {
        showLoader(true);
        _userRef.doc(_currentUser.uid).set({
            favMovies: firebase.firestore.FieldValue.arrayUnion(movieId)
        }, {
            merge: true
        });
    }

    // removes a given movieId to the favMovies array inside _currentUser
    removeFromFavourites(movieId) {
        showLoader(true);
        _userRef.doc(_currentUser.uid).update({
            favMovies: firebase.firestore.FieldValue.arrayRemove(movieId)
        });
    }
}

const movieService = new MovieService();
export default movieService;