import {FirestoreDataConverter, DocumentData, QueryDocumentSnapshot} from "firebase-admin/firestore";
import {DataModel} from "./DataModel";
import {UserScope} from "./UserScope";

export class AppUser implements DataModel<AppUser> {

    /**
     * The [User]'s id in the DB
     */
    id: string | null
    /**
     * The [User]'s Google UID
     */
    googleUid: string | null

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
    secondaryEmail: string | null

    /**
     * The scope of the [User]'s permissions in the app.
     */
    scope: UserScope[] | null


    picture: string | null



    constructor(
        firstName: string,
        lastName: string,
        primaryEmail: string,
        id: string | null,
        secondaryEmail: string | null,
        googleUid: string | null,
        scope: UserScope[] | null,
        picture: string | null
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.primaryEmail = primaryEmail
        this.id = id
        this.secondaryEmail = secondaryEmail
        this.googleUid = googleUid
        this.scope = scope
        this.picture = picture
    }

    toDbo() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            primaryEmail: this.primaryEmail,
            id: this.id,
            secondaryEmail: this.secondaryEmail,
            googleUid: this.googleUid,
            scope: this.scope,
            picture: this.picture
        }
    }

}

export const AppUserConverter : FirestoreDataConverter<AppUser> = {

    toFirestore(modelObject: AppUser): DocumentData {

        return {
            id: modelObject.id,
            firstName: modelObject.firstName,
            lastName: modelObject.lastName,
            primaryEmail: modelObject.primaryEmail,
            secondaryEmail: modelObject.secondaryEmail,
            googleUid: modelObject.googleUid,
            scope: modelObject.scope,
            picture: modelObject.picture
        }

    },

    fromFirestore(snapshot: QueryDocumentSnapshot): AppUser {
        const data = snapshot.data()
        // @ts-ignore
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            primaryEmail: data.primaryEmail,
            id: data.id,
            secondaryEmail: data.secondaryEmail,
            googleUid: data.googleUid,
            scope: data.scope,
            picture: data.picture
        }
    }


}

