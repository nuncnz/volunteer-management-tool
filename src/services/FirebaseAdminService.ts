import {AppOptions, cert, getApp, getApps, initializeApp} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"

export class FirebaseAdminService {

    app
    auth
    firestore

    constructor() {
        const options: AppOptions = {
            credential: cert({
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
            })
        };

        this.app = this.createFirebaseAdminApp(options);

        this.auth = getAuth(this.app)
        this.firestore = getFirestore(this.app)
    }

    createFirebaseAdminApp(config: AppOptions) {
        if (getApps().length === 0) {
            return initializeApp(config);
        } else {
            return getApp();
        }
    }

    getAuth() { return this.auth }

    getFirestore() { return this.firestore }

}