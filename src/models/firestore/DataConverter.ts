import {QueryDocumentSnapshot} from "firebase-admin/firestore";

export const dataConverter = <T>() => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
        snap.data() as T
})