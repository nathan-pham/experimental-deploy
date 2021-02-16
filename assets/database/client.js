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

/*
const loginAccount = async (email, password) => {
	let idToken
	try {
		let { user } = await firebase.auth().signInWithEmailAndPassword(email, password)
		idToken = await firebase.auth().currentUser.getIdToken()
	}
	catch(e) {
		return createAlert("Incorrect username or password.")
	}

	let details = await query("u/login", { idToken })
	
	if(details.hasOwnProperty("error")) {
		createAlert(details.error)
	}
	else {
		const expiresIn = 60 * 60 * 24 * 5 * 1000

		await firebase.auth().signOut()

		setCookie(null, "convex-next", details.success, {
			maxAge: expiresIn
		})
		
		location.assign("/h")
	}
}

const createAccount = async () => {

}

export {
	loginAccount,
	createAccount
}
*/