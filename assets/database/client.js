// import { setCookie } from "nookies"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import query from "./query"

const config = {
    apiKey: process.env.api_key,
    authDomain: "experimental-deploy-877e3.firebaseapp.com",
    projectId: "experimental-deploy-877e3",
    storageBucket: "experimental-deploy-877e3.appspot.com",
    messagingSenderId: "477539724169",
    appId: "1:477539724169:web:2071040d1c6671f8d58f58",
    measurementId: "G-Q038KZWGRS"
}
  
firebase.apps.length ? firebase.app() : firebase.initializeApp(config)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

const firestore = firebase.firestore()
const collections = {
    projects: firestore.collection("projects")
}

export default firestore
export { collections }