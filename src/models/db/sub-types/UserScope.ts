import {VaccinationStatus} from "./VaccinationStatus";

export enum UserScope {

    ADMIN = "ADMIN",
    HAUORA = "HAUORA",
    ATTENDANCE = "ATTENDANCE",
    FINANCE = "FINANCE",

}

export const UserScopeList = [UserScope.ADMIN, UserScope.HAUORA, UserScope.ATTENDANCE, UserScope.FINANCE]

export const getUserScopeText = (userScope: UserScope) : string => {

    switch (userScope) {
        case UserScope.ADMIN:
            return "Admin 🧑‍⚖️️"

        case UserScope.ATTENDANCE:
            return "Attendance 👮‍♀️"

        case UserScope.HAUORA:
            return "Huaora 🩺"

        case UserScope.FINANCE:
            return "Finance 💵"

        default:
            return userScope

    }
}