import {FirebaseAdminService} from "./FirebaseAdminService";
import {Firestore, FirestoreDataConverter, CollectionReference} from "firebase-admin/firestore"
import {FirestoreCollection} from "../models/FirestoreCollection";
import {DataModel} from "../models/DataModel";

export class FirestoreService<T extends DataModel<T>> {

    private firestore: Firestore
    collection: CollectionReference
    converter: FirestoreDataConverter<T>
    
    constructor(firebaseAdminService: FirebaseAdminService, collection: FirestoreCollection, converter: FirestoreDataConverter<T>) {

        this.firestore = firebaseAdminService.getFirestore()
        this.collection = this.firestore.collection(collection).withConverter(converter)
        this.converter = converter

    }

    getDoc() {

    }

    getDocs() {

    }

    /**
     * Creates a new Firestore document with the [data] received, setting the document ID to the [data].
     */
    async addDoc(data: T) {
        if (data.id == null || undefined) {
            const documentReference = this.collection.doc()
            console.log(documentReference.id)
            data.id = documentReference.id
            console.log(data)
            return await this.collection.doc(documentReference.id).set(data).then(async () => {
                return await this.collection.doc(documentReference.id).get().then((doc) => {
                    return doc.data()
                })
            })
        }
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