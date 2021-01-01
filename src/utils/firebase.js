import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyAAcfXFO1d9QkKqhdIjzV2CSen0517lXQU",
    authDomain: "mjr-instagram-clone.firebaseapp.com",
    projectId: "mjr-instagram-clone",
    storageBucket: "mjr-instagram-clone.appspot.com",
    messagingSenderId: "168501919631",
    appId: "1:168501919631:web:53ca3fdbfeb88ec2e955fa"
})

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export { db, auth, storage }