import AppPage from "../../../../components/AppPage";
import {useState} from "react";
import {util} from "protobufjs";
import {Member} from "../../../../models/db/Members";


const AdminAddMembersPage = () => {

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [primaryEmail, setPrimaryEmail] = useState<string>("")
    const [dateOfBirth, setDateOfBirth] = useState<string>("")

    const createMember = async () => {

        const memberObj = new Member({
            firstName: firstName,
            lastName: lastName,
            primaryEmail: primaryEmail,
            dateOfBirth: dateOfBirth
        })

        const options = {
            method: "POST",
            body: JSON.stringify(memberObj)
        }

        await fetch("/api/members/add", options).then(async (res) => {
            const resJson = await res.json()
            console.log(resJson)
        })

    }

    return (
        <AppPage>
            <div>
                <input value={firstName} type={"text"} onChange={(e) => setFirstName(e.target.value)}/>
                <input value={lastName} type={"text"} onChange={(e) => setLastName(e.target.value)}/>
                <input value={primaryEmail} type={"text"} onChange={(e) => setPrimaryEmail(e.target.value)}/>
                <input type={"date"} name={"dateOfBirth"} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
            </div>
            <button onClick={() => createMember()}>Upload</button>
        </AppPage>
    )

}

export default AdminAddMembersPage