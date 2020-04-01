import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyATHNhJKMrhzf3VcuuW87I2MHPBrYrzJdA",
  authDomain: "aedesmap-database.firebaseapp.com",
  databaseURL: "https://aedesmap-database.firebaseio.com",
  projectId: "aedesmap-database",
  storageBucket: "aedesmap-database.appspot.com",
  messagingSenderId: "806932317028",
  appId: "1:806932317028:web:8ea76fad6b6f9fe2f7f071"
}

firebase.initializeApp(firebaseConfig)

export default firebase