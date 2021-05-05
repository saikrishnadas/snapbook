import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //config
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

export { db, auth, storage, signInWithGoogle };
