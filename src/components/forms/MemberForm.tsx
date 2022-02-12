import {VaccinationStatus} from "../../models/db/sub-types/VaccinationStatus";
import BaseForm from "./BaseForm";
import {useRouter} from "next/router";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Member} from "../../models/db/Members";
import styled from "styled-components";
import Button, {ButtonSize} from "../Button";
import {CustomComponentProps} from "../../utils/CustomComponentProps";

interface MemberFormProps extends CustomComponentProps {
    member?: Member | null
    memberSetState:  Dispatch<SetStateAction<Member | null>>
}

const CustomMemberForm = ({member = null, memberSetState} : MemberFormProps) => {

    const [isNew, setIsNew] = useState<boolean>(member == null)
    const [firstName, setFirstName] = useState<string>(isNew ? "" : member!!.firstName)
    const [lastName, setLastName] = useState<string>(isNew ? "" : member!!.lastName)
    const [primaryEmail, setPrimaryEmail] = useState<string>(isNew ? "" : member!!.primaryEmail)
    const [dateOfBirth, setDateOfBirth] = useState<string>(isNew ? "" : member!!.dateOfBirth)
    const [vaccinationStatus, setVaccinationStatus] = useState<VaccinationStatus>(isNew ? VaccinationStatus.UNKNOWN : member!!.vaccinationStatus)

    useEffect(() => {
        setIsNew(member == null)
        setFirstName(isNew ? "" : member!!.firstName)
        setLastName(isNew ? "" : member!!.lastName)
        setPrimaryEmail(isNew ? "" : member!!.primaryEmail)
        setDateOfBirth(isNew ? "" : member!!.dateOfBirth)
        setVaccinationStatus(isNew ? VaccinationStatus.UNKNOWN : member!!.vaccinationStatus)
    }, [member, isNew])

    const router = useRouter()

    const handleSubmit = async () => {

        if (
            firstName == "" ||
            lastName == "" ||
            primaryEmail == "" ||
            dateOfBirth == ""
        ) {
            console.log("Date missing")
            return
        }

        const memberObj = new Member({
                                         firstName: firstName,
                                         lastName: lastName,
                                         primaryEmail: primaryEmail,
                                         id: member?.id,
                                         secondaryEmail: member?.secondaryEmail,
                                         googleUid: member?.googleUid,
                                         picture: member?.picture,
                                         dateOfBirth: dateOfBirth,
                                         vaccinationStatus: vaccinationStatus
                                     })

        const options = {
            method: "POST",
            body: JSON.stringify(memberObj)
        }

        await fetch("/api/members/", options).then(async (res) => {
            if(res.status == 200) {
                memberSetState(null)
                await router.replace("/app/admin/members")
            }
        })

    }


    return (
        <BaseForm>
            <div>
                <div id={"names"}>
                    <div id={"input"}>
                        <h3>First Name</h3>
                        <input value={firstName} type={"text"} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div id={"input"}>
                        <h3>Last Name</h3>
                        <input value={lastName} type={"text"} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                </div>
                <div id={"input"}>
                    <h3>Email</h3>
                    <input value={primaryEmail} type={"text"} onChange={(e) => setPrimaryEmail(e.target.value)}/>
                </div>
                <div id={"input"}>
                    <h3>Date of Birth</h3>
                    <input type={"date"} name={"dateOfBirth"} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                </div>
                <div id={"input"}>
                    <h3>Vaccination Status</h3>
                    <select id="cars" value={vaccinationStatus} onChange={(e) => setVaccinationStatus(e.target.value as VaccinationStatus)}>
                        <option value={VaccinationStatus.UNKNOWN}>Unknown❔</option>
                        <option value={VaccinationStatus.VALID}>Valid ✅</option>
                        <option value={VaccinationStatus.INVALID}>Invalid 🛑</option>
                        <option value={VaccinationStatus.NO_PASS}>No Pass 🚩</option>
                    </select>
                </div>
                <Button label={isNew ? "Create" : "Update"} size={ButtonSize.REGULAR} onClick={() => handleSubmit()} />
            </div>
        </BaseForm>
    )

}

const MemberForm = styled(CustomMemberForm)``

export default MemberForm