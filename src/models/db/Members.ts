import {DataModel} from "./DataModel";
import {UserScope} from "./UserScope";
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot} from "firebase-admin/lib/firestore";

export class Member implements DataModel<Member>{

    /**
     * The [Member]'s id in the DB
     */
    id: string | null
    /**
     * The [Member]'s Google UID
     */

    /**
     * The [Member]'s first name.
     */
    firstName: string
    /**
     * The [Member]'s last name.
     */
    lastName: string

    /**
     * The [Member]'s primary email.
     */
    primaryEmail: string
    /**
     * The [Member]'s secondary email.
     */
    secondaryEmail: string | null



    dateOfBirth: string



    // constructor(
    //     firstName: string,
    //     lastName: string,
    //     primaryEmail: string,
    //     id: string | null,
    //     secondaryEmail: string | null,
    //     googleUid: string | null,
    //     picture: string | null
    // )

    constructor(member: {firstName: string,
        lastName: string,
        primaryEmail: string,
        id?: string | null,
        secondaryEmail?: string | null,
        googleUid?: string | null,
        picture?: string | null,
        dateOfBirth: string})
    {
        this.firstName = member.firstName
        this.lastName = member.lastName
        this.primaryEmail = member.primaryEmail
        this.id = member.id || null
        this.secondaryEmail = member.secondaryEmail || null
        this.dateOfBirth = member.dateOfBirth
    }

    toDbo() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            primaryEmail: this.primaryEmail,
            id: this.id,
            secondaryEmail: this.secondaryEmail,
        }
    }

}

export const MemberConverter : FirestoreDataConverter<Member> = {

    toFirestore(modelObject: Member): DocumentData {

        return {
            id: modelObject.id,
            firstName: modelObject.firstName,
            lastName: modelObject.lastName,
            primaryEmail: modelObject.primaryEmail,
            secondaryEmail: modelObject.secondaryEmail,
            dateOfBirth: modelObject.dateOfBirth
        }

    },

    fromFirestore(snapshot: QueryDocumentSnapshot): Member {
        const data = snapshot.data()
        // @ts-ignore
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            primaryEmail: data.primaryEmail,
            id: data.id,
            secondaryEmail: data.secondaryEmail,
            dateOfBirth: data.dateOfBirth
        }
    }


}