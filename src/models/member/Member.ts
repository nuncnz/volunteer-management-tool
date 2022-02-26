import {DataModel} from "../firestore/DataModel";
import {UserScope} from "../user/UserScope";
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot} from "firebase-admin/lib/firestore";
import {VaccinationStatus} from "./VaccinationStatus";

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

    /**
     * The member's date of birth.
     */
    dateOfBirth: string

    vaccinationStatus: VaccinationStatus

    googleUid: string | null

    picture: string | null

    constructor(member: {firstName: string,
        lastName: string,
        primaryEmail: string,
        id?: string | null,
        secondaryEmail?: string | null,
        googleUid?: string | null,
        picture?: string | null,
        dateOfBirth: string,
        vaccinationStatus: VaccinationStatus
    })
    {
        this.firstName = member.firstName
        this.lastName = member.lastName
        this.primaryEmail = member.primaryEmail
        this.id = member.id || null
        this.secondaryEmail = member.secondaryEmail || null
        this.dateOfBirth = member.dateOfBirth
        this.vaccinationStatus = member.vaccinationStatus
        this.googleUid = member.googleUid || null
        this.picture = member.picture || null
    }
}