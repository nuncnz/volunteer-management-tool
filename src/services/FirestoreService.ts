import {FirebaseAdminService} from "./FirebaseAdminService";
import {Firestore, FirestoreDataConverter, CollectionReference} from "firebase-admin/firestore"
import {FirestoreCollection} from "../models/FirestoreCollection";
import {DataModel} from "../models/DataModel";
import {Query} from "../models/Query";

export class FirestoreService<T extends DataModel<T>> {

    firebaseAdmin: FirebaseAdminService
    firestore: Firestore
    collection: CollectionReference
    converter: FirestoreDataConverter<T>

    constructor(firebaseAdminService: FirebaseAdminService, collection: FirestoreCollection, converter: FirestoreDataConverter<T>) {
        this.firebaseAdmin = firebaseAdminService
        this.firestore = firebaseAdminService.getFirestore()
        this.collection = this.firestore.collection(collection).withConverter(converter)
        this.converter = converter

    }

    async getDoc(query: Query) : Promise<T | undefined> {
        const querySnapshot = await this.collection.where(
            query.searchField,
            query.operator,
            query.searchValue).get()

        if (querySnapshot.docs.length == 1) {
            return this.converter.fromFirestore(querySnapshot.docs[0]);
        } else {
            return undefined
        }

    }

    getDocs() {

    }

    /**
     * Creates a new Firestore document with the [data] received, setting the document ID to the [data].
     */
    async addDoc(data: T) {
        console.log(data)

        const docRef = this.collection.doc()
        data.id = docRef.id
        await this.collection.doc(docRef.id).set(data).then((r) => {
            console.log(r)
        })

        return await this.getDoc(new Query("id", "==", data.id))
    }

    addDocs() {

    }

    updateDoc() {

    }

    updateDocs() {

    }

    deleteDoc() {

    }

    deleteDocs() {

    }
}