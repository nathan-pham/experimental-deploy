import admin from "firebase-admin"

const serviceAccount = {
    "type": "service_account",
    "project_id": "experimental-deploy-877e3",
	"private_key_id": process.env.private_key_id,
	"private_key": process.env.private_key,
    "client_email": "firebase-adminsdk-d4ye7@experimental-deploy-877e3.iam.gserviceaccount.com",
    "client_id": "110306557474389171811",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d4ye7%40experimental-deploy-877e3.iam.gserviceaccount.com"
}

const config = {
    credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://experimental-deploy-877e3.firebaseio.com"
}

admin.apps.length ? admin.app() : admin.initializeApp(config)

const firestore = admin.firestore()
const collections = {
    projects: firestore.collection("projects")
}

export default firestore
export { collections }