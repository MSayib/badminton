import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// eslint-disable-next-line no-var
var firebaseConfig = {
    apiKey: 'AIzaSyDjXrhPT4OnndXi2gx8MPJteHhQF5NCPlQ',
    authDomain: 'badminton-apps.firebaseapp.com',
    databaseURL: 'https://badminton-apps.firebaseio.com',
    projectId: 'badminton-apps',
    storageBucket: 'badminton-apps.appspot.com',
    messagingSenderId: '923029487950',
    appId: '1:923029487950:web:938880332115f2f6941e1f',
    measurementId: 'G-QS247VCNCH'
}
// Initialize Firebase
// eslint-disable-next-line no-unused-vars
let app = null
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig)
}
export default firebase.firestore()
