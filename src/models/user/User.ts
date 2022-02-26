import {FirestoreDataConverter, DocumentData, QueryDocumentSnapshot} from "firebase-admin/firestore";
import {DataModel} from "../firestore/DataModel";
import {UserScope} from "./UserScope";

export class User implements DataModel<User> {

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



    constructor(user: {
        firstName: string,
        lastName: string,
        primaryEmail: string,
        id?: string | null,
        secondaryEmail?: string | null,
        googleUid?: string | null,
        scope: UserScope[] | null,
        picture?: string | null}
    ) {
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.primaryEmail = user.primaryEmail
        this.id = user.id || null
        this.secondaryEmail = user.secondaryEmail || null
        this.googleUid = user.googleUid || null
        this.scope = user.scope
        this.picture = user.picture || null
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

