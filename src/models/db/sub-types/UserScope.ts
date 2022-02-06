import {VaccinationStatus} from "./VaccinationStatus";

export enum UserScope {

    ADMIN = "ADMIN",
    USER = "USER",
    HAUORA = "HAUORA",
    ATTENDANCE = "ATTENDANCE",
    AUTHED = "AUTHED",
    NONE = "NONE",

}

export const UserScopeList = [UserScope.ADMIN, UserScope.USER, UserScope.HAUORA, UserScope.ATTENDANCE, UserScope.AUTHED, UserScope.NONE]

export const getUserScopeText = (userScope: UserScope) : string => {

    switch (userScope) {
        case UserScope.ADMIN:
            return "Admin 🧑‍⚖️️"

        case UserScope.ATTENDANCE:
            return "Attendance 👮‍♀️"

        case UserScope.HAUORA:
            return "Huaora 🩺"

        case UserScope.AUTHED:
            return "Authed 🔐"

        default:
            return userScope

    }
}