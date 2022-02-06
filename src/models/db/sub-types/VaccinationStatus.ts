export enum VaccinationStatus {
    UNKNOWN = "UNKOWN",
    VALID = "VACCINE_PASS_VALID",
    INVALID = "VACCINE_PASS_INVALID",
    NO_PASS = "NO_VACCINE_PASS"
}

export const getVaccinationStatusText = (vaccinationStatus: VaccinationStatus) : string => {

    switch (vaccinationStatus) {
        case VaccinationStatus.UNKNOWN:
            return "Unknown 🤷‍♂️"

        case VaccinationStatus.VALID:
            return "Valid Pass ✅"

        case VaccinationStatus.INVALID:
            return "Invalid Pass 🛑"

        case VaccinationStatus.NO_PASS:
            return "NO PASS ⛔️"

    }
}