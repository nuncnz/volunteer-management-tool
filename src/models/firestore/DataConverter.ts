import {firestore} from "firebase-admin";
import { QueryDocumentSnapshot } from "firebase-admin/firestore"
import FirestoreDataConverter = firestore.FirestoreDataConverter;

export const dataConverter = <T>() : FirestoreDataConverter<T> => ({
    toFirestore: (data: Partial<T>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
        snap.data() as T
})