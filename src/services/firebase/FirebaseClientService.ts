import {FirebaseApp, initializeApp} from "firebase/app";
import {Firestore, getFirestore} from "@firebase/firestore";
import {Auth, getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "@firebase/auth";

export default class FirebaseClientService {

    private readonly app: FirebaseApp
    private readonly firestore: Firestore
    auth: Auth

    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyBCsEbzfxjQmlhhv4wqPYLF1NcsYzClwpU",
            authDomain: "volunteer-tool.firebaseapp.com",
            projectId: "volunteer-tool",
            storageBucket: "volunteer-tool.appspot.com",
            messagingSenderId: "273616249226",
            appId: "1:273616249226:web:db6b7d92240c61e4b16873",
        };

        this.app = initializeApp(firebaseConfig);
        this.firestore = getFirestore(this.app)
        this.auth = getAuth(this.app)
    }

    // public getFirestore() { return this.firestore }

    public getAuth() { return this.auth }

    public signInWithGoogle(redirectOnSuccess: string = "/app/dashboard") {
        let provider = new GoogleAuthProvider()

        provider.setCustomParameters({
            prompt: "select_account"
        })

        signInWithPopup(this.auth, provider)
            .then(async (cred) => {

                await cred.user.getIdToken().then(async (token) => {

                    const options = {
                        method: "POST",
                        body: JSON.stringify({token: token})
                    }

                    await fetch("/api/auth/login", options).then(async (res) => {
                        const resJson = await res.json()
                        if (resJson.user == null || undefined) {
                            this.logOut()
                        } else {
                            window.location.href = redirectOnSuccess
                        }
                    })
                })
            })
    }


    public logOut() {
        signOut(this.auth).then((result) => {
            window.location.href = "/"
        }).catch((error) => {})
    }

}

