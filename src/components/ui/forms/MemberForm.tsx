import {VaccinationStatus} from "../../../models/member/VaccinationStatus";
import BaseForm from "./BaseForm";
import {useState} from "react";
import {Member} from "../../../models/member/Member";
import styled from "styled-components";
import Button, {ButtonSize, ButtonStyle} from "../Button";
import {CustomComponentProps} from "../../CustomComponentProps";
import "../../../util/isSuccessful"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {TextField} from "@mui/material";
import CustomTextField from "../mui/TextField";
import NewMemberForm from "./new-forms/NewMemberForm";

interface MemberFormProps extends CustomComponentProps {
    member?: Member
    successCallback?: (successMsg?: string) => any
    errorCallback?: (errorMsg?: string) => any
}


const Error = styled.div`

  position: fixed;
  bottom: 20px;
  width: 200px;
  height: 80px;
  background-color: red;
  
`


const CustomMemberForm = ({member = Member.empty(), successCallback = () => {}, errorCallback = () => {}} : MemberFormProps) => {

    const [memberState, setMember] = useState(member)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const handleSubmit = async () => {

        console.log(memberState.isValid())
        if (!memberState.isValid()) {

            setErrorMsg("Invalid input data, please check and try again.")
            return
        }

        const options = {
            method: "POST",
            body: JSON.stringify(memberState)
        }

        const updateResp = await fetch("/api/members/", options)

        if(updateResp.status.isSuccessful()) {
            successCallback()
        } else {
            errorCallback()
        }
    }


    const showError = () => {
        if (errorMsg) {
            return (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setErrorMsg(null)}>
                    <Alert onClose={() => setErrorMsg(null)} severity="error" sx={{ width: '100%' }}>
                        {errorMsg}
                    </Alert>
                </Snackbar>
            )
        }
    }


    return (
        <>
            {/*{showError()}*/}
            {/*<BaseForm>*/}
            {/*    <div>*/}
            {/*        <div id={"names"}>*/}
            {/*            <div id={"input"}>*/}
            {/*                <h3>First Name</h3>*/}
            {/*                <input value={memberState.firstName} type={"text"} onChange={(e) => setMember({...memberState, firstName: e.target.value})}/>*/}
            {/*            </div>*/}
            {/*            <div id={"input"}>*/}
            {/*                <h3>Last Name</h3>*/}
            {/*                <input value={memberState.lastName} type={"text"} onChange={(e) => setMember({...memberState, lastName: e.target.value})}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div id={"input"}>*/}
            {/*            <h3>Email</h3>*/}
            {/*            <input value={memberState.primaryEmail} type={"text"} onChange={(e) => setMember({...memberState, primaryEmail: e.target.value})}/>*/}
            {/*        </div>*/}
            {/*        <div id={"input"}>*/}
            {/*            <h3>Date of Birth</h3>*/}
            {/*            <input type={"date"} name={"dateOfBirth"} value={memberState.dateOfBirth} onChange={(e) => setMember({...memberState, dateOfBirth: e.target.value})}/>*/}
            {/*        </div>*/}
            {/*        <div id={"input"}>*/}
            {/*            <h3>Vaccination Status</h3>*/}
            {/*            <select id="cars" value={memberState.vaccinationStatus} onChange={(e) => setMember({...memberState, vaccinationStatus: e.target.value as VaccinationStatus})}>*/}
            {/*                <option value={VaccinationStatus.UNKNOWN}>Unknown❔</option>*/}
            {/*                <option value={VaccinationStatus.VALID}>Valid ✅</option>*/}
            {/*                <option value={VaccinationStatus.INVALID}>Invalid 🛑</option>*/}
            {/*                <option value={VaccinationStatus.NO_PASS}>No Pass 🚩</option>*/}
            {/*            </select>*/}
            {/*        </div>*/}
            {/*        <Button label={member.isBlank() ? "Create" : "Update"} size={ButtonSize.REGULAR} styling={ButtonStyle.PRIMARY} onClick={() => handleSubmit()} />*/}
            {/*    </div>*/}
            {/*</BaseForm>*/}
            <NewMemberForm />
        </>
    )

}

const MemberForm = styled(CustomMemberForm)``

export default MemberForm