import {FirestoreDataConverter, DocumentData, QueryDocumentSnapshot} from "firebase-admin/firestore";
import {DataModel} from "./DataModel";

export class AppUser implements DataModel<AppUser> {

    id?: string

    /**
     * The [User]'s first name.
     */
    firstName: string
    /**
     * The [User]'s last name.
     */
    lastName: string

    /**
     * The [User]'s primary email.
     */
    primaryEmail: string
    /**
     * The [User]'s secondary email.
     */
    secondaryEmail?: string

    constructor(
        firstName: string,
        lastName: string,
        primaryEmail: string,
        id?: string,
        secondaryEmail?: string
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.primaryEmail = primaryEmail
        this.id = id
        this.secondaryEmail = secondaryEmail
    }
}

export const AppUserConverter : FirestoreDataConverter<AppUser> = {

    toFirestore(modelObject: AppUser): DocumentData {

        return {
            id: modelObject.id,
            firstName: modelObject.firstName,
            lastName: modelObject.lastName,
            primaryEmail: modelObject.primaryEmail
        }

    },

    fromFirestore(snapshot: QueryDocumentSnapshot): AppUser {
        const data = snapshot.data()
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            primaryEmail: data.primaryEmail,
            id: data.id,
            secondaryEmail: data.secondaryEmail
        }
    }


}

