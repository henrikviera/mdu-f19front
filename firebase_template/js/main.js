"use strict";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMyBxTqrwDePj6kSVgD5rVsEQ-66FCoCk",
  authDomain: "mdu-e18front.firebaseapp.com",
  databaseURL: "https://mdu-e18front.firebaseio.com",
  projectId: "mdu-e18front",
  storageBucket: "mdu-e18front.appspot.com",
  messagingSenderId: "1065294705229",
  appId: "1:1065294705229:web:81f00c89d44d800c75e204"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const userRef = db.collection("users");

// watch the database ref for changes
userRef.onSnapshot(function(snapshotData) {
  let users = [];
  snapshotData.forEach(function(doc) {
    let user = doc.data();
    user.id = doc.id;
    users.push(user);
  });
  appendUsers(users);
});

// append users to the DOM
function appendUsers(users) {
  console.log(users);
}