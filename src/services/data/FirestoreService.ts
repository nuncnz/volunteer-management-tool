import {FirebaseAdminService} from "../firebase/FirebaseAdminService";
import {Firestore, FirestoreDataConverter, CollectionReference} from "firebase-admin/firestore"
import {FirestoreCollection} from "../../models/util/FirestoreCollection";
import {DataModel} from "../../models/util/DataModel";
import {Query} from "../../models/util/Query";

export class FirestoreService<T extends DataModel<T>> {

    firebaseAdmin: FirebaseAdminService
    firestore: Firestore
    collection: CollectionReference
    converter: FirestoreDataConverter<T>

    constructor(firebaseAdminService: FirebaseAdminService, collection: FirestoreCollection, converter: FirestoreDataConverter<T>) {
        this.firebaseAdmin = firebaseAdminService
        this.firestore = firebaseAdminService.getFirestore()
        this.collection = this.firestore.collection(collection)
        this.converter = converter

    }

    async getDoc(query: Query){
        const querySnapshot = await this.collection.withConverter(this.converter).where(
            query.searchField,
            query.operator,
            query.searchValue).get()

        if (querySnapshot.docs.length == 1) {
            return this.converter.fromFirestore(querySnapshot.docs[0]);
        } else {
            return undefined
        }

    }

    async getDocs() {
        return this.collection.withConverter(this.converter).get().then((querySnapshot) => {
            return querySnapshot.docs.map((doc) => {
                return doc.data()
            })
        })
    }

    /**
     * Creates a new Firestore document with the [data] received, setting the document ID to the [data].
     */
    async addDoc(data: T) {
        const docRef = this.collection.withConverter(this.converter).doc()
        data.id = docRef.id
        await this.collection.withConverter(this.converter).doc(docRef.id).set(data).then((r) => {})

        return await this.getDoc(new Query("id", "==", data.id))
    }

    addDocs() {

    }

    async updateDoc(data: T) {
        if (data.id != null) {
            const docRef = this.collection.doc(data.id!!)
            await this.collection.doc(docRef.id).set(data).then((r) => {
            })

            return await this.getDoc(new Query("id", "==", data.id!!))
        }
    }

    updateDocs() {

    }

    async deleteDoc(id: string) {
        await this.collection.doc(id).delete().then((r) => console.log(r))
    }

    deleteDocs() {

    }
}