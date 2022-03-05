import {DataModel} from "../firestore/DataModel";
import {VaccinationStatus} from "./VaccinationStatus";

/**
 * Data class that represents a member of a volunteer organisation.
 */
export class Member implements DataModel {

    /**
     * @param id The [Member]'s id in the DB
     * @param googleUid The [Member]'s Google UID
     * @param firstName The [Member]'s first name.
     * @param lastName The [Member]'s last name.
     * @param primaryEmail The [Member]'s primary email.
     * @param secondaryEmail The [Member]'s secondary email.
     * @param dateOfBirth The [Member]'s date of birth.
     * @param vaccinationStatus Vaccination status of the [Member].
     * @param picture Profile picture of the [Member].
     */
    constructor(
        public id: string | null,
        public googleUid: string | null,
        public firstName: string,
        public lastName: string,
        public primaryEmail: string,
        public secondaryEmail: string | null,
        public dateOfBirth: string,
        public vaccinationStatus: VaccinationStatus,
        public picture: string | null
    ) {}

    /**
     * Takes a [Member] in the form of an object, and returns an instance of the [Member] class matching [obj]
     *
     * @param obj A [Member] in the form of an object.
     */
    static fromObj(obj: Member): Member {
        return new Member(
            obj.id,
            obj.googleUid,
            obj.firstName,
            obj.lastName,
            obj.primaryEmail,
            obj.secondaryEmail,
            obj.dateOfBirth,
            obj.vaccinationStatus,
            obj.picture)
    }

    static empty = (): Member => {
        return new Member(
            null,
            null,
            "",
            "",
            "",
            null,
            "",
            VaccinationStatus.UNKNOWN,
            null,
        )
    }

    isValid = (): boolean => {
        return false
    }

    isBlank = (): boolean => {
        return true
    }

}





