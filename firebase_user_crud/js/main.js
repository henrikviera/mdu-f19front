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

let selectedUserId = "";

// ========== READ ==========
// watch the database ref for changes
userRef.onSnapshot(function(snapshotData) {
  let users = [];
  snapshotData.forEach(function(doc) {
    let user = doc.data();
    console.log(user);
    user.id = doc.id;
    users.push(user);
  });
  appendUsers(users);
});

// append users to the DOM
function appendUsers(users) {
  let htmlTemplate = "";
  for (let user of users) {
    console.log(user.id);
    console.log(user.name);
    htmlTemplate += `
    <article>
      <h2>${user.name}</h2>
      <p><a href="mailto:${user.mail}">${user.mail}</a></p>
      <button onclick="selectUser('${user.id}','${user.name}', '${user.mail}')">Update</button>
      <button onclick="deleteUser('${user.id}')">Delete</button>
    </article>
    `;
  }
  document.querySelector('#content').innerHTML = htmlTemplate;
}

// ========== CREATE ==========
// add a new user to firestore (database)
function createUser() {
  // references to the input fields
  let nameInput = document.querySelector('#name');
  let mailInput = document.querySelector('#mail');
  console.log(nameInput.value);
  console.log(mailInput.value);

  let newUser = {
    name: nameInput.value,
    mail: mailInput.value
  };

  userRef.add(newUser);
}

// ========== UPDATE ==========

function selectUser(id, name, mail) {
  // references to the input fields
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  nameInput.value = name;
  mailInput.value = mail;
  selectedUserId = id;
}

function updateUser() {
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');

  let userToUpdate = {
    name: nameInput.value,
    mail: mailInput.value
  };
  userRef.doc(selectedUserId).set(userToUpdate);
}

// ========== DELETE ==========
function deleteUser(id) {
  console.log(id);
  userRef.doc(id).delete();
}