import {FirebaseAdminService} from "./FirebaseAdminService";
import {Firestore, CollectionReference} from "firebase-admin/firestore"
import {FirestoreCollection} from "./FirestoreCollection";
import {DataModel} from "./DataModel";
import {Query} from "./Query";
import {firestore} from "firebase-admin";
import FirestoreDataConverter = firestore.FirestoreDataConverter;
import classToDto from "../util/ClassToDto";

export class FirestoreService<T extends DataModel<T>> {

    firebaseAdmin: FirebaseAdminService
    firestore: Firestore
    collection: CollectionReference
    converter: FirestoreDataConverter<T>

    constructor(firebaseAdminService: FirebaseAdminService, collection: FirestoreCollection, converter: FirestoreDataConverter<T>) {
        this.firebaseAdmin = firebaseAdminService
        this.firestore = firebaseAdminService.getFirestore()
        this.converter = converter
        this.collection = this.firestore.collection(collection).withConverter(this.converter)
    }

    async getDoc(query: Query){
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
        const docRef = this.collection.doc()
        data.id = docRef.id
        const newData = classToDto(data) as T
        await this.collection.doc(docRef.id).set(newData).then((r) => {})

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