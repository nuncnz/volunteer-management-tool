import {credential, initializeApp} from "firebase-admin";
import {FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY, FIREBASE_ADMIN_PROJECT_ID} from "../config";

export const firebaseAdmin = initializeApp({
    credential: credential.cert({
        privateKey: FIREBASE_ADMIN_PRIVATE_KEY,
        clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
        projectId: FIREBASE_ADMIN_PROJECT_ID,
    })
})

