import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyAU1OP24wDEO7g96_xl1C8nCS_NvjnRCfs",
      authDomain: "sharepj-66aa5.firebaseapp.com",
      projectId: "sharepj-66aa5",
      storageBucket: "sharepj-66aa5.appspot.com",
      messagingSenderId: "790606460927",
      appId: "1:790606460927:web:1679f8c4bb4382065f99ca",
      measurementId: "G-92Z1E8LG1H"
    }
  )
}
  
export default firebase
