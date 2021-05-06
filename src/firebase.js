import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //config
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const signInWithGoogle = () => {
  if (auth.currentUser === null) {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
};

const signOut = () => {
  auth.currentUser && auth.signOut();
  alert("You have Signed out!");
};

export { db, auth, storage, signInWithGoogle, signOut };
