import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBEQW9jtmuXbFern0irXR1umEgkmBr8-3Q",
  authDomain: "tcard-syc.firebaseapp.com",
  databaseURL:
    "https://tcard-syc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tcard-syc",
  storageBucket: "tcard-syc.appspot.com",
  messagingSenderId: "27147994029",
  appId: "1:27147994029:web:e7908897892f6ab8aa1724",
  measurementId: "G-NTWN5RBFG4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("login");
    } else {
      console.log("logout");
    }
  });
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
