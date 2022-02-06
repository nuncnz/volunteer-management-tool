import AppPage from "../../../../components/pages/AppPage";
import {useState} from "react";
import {UserScope} from "../../../../models/db/sub-types/UserScope";
import {AppUser} from "../../../../models/db/AppUser";
import Form from "../../../../components/forms/Form";

const AdminAddUserPage = () => {

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [primaryEmail, setPrimaryEmail] = useState<string>("")
    const [scope, setScope] = useState<UserScope>(UserScope.USER)

    const createUser = async () => {

        const userObj = new AppUser({
            firstName: firstName,
            lastName: lastName,
            scope: [scope],
            primaryEmail: primaryEmail,

        })

        const options = {
            method: "POST",
            body: JSON.stringify(userObj)
        }

        await fetch("/api/users/add", options).then(async (res) => {
            const resJson = await res.json()
        })

    }

    return (
        <AppPage>
            <Form>
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
                        <h3>User Scope</h3>
                        <select multiple={true} value={scope} onChange={(e) => setScope(e.target.value as UserScope)}>
                            <option value={UserScope.USER}>User</option>
                            <option value={UserScope.ADMIN}>Admin</option>
                        </select>
                    </div>
                    <button onClick={() => createUser()}>Create</button>
                </div>
            </Form>
        </AppPage>
    )

}

export default AdminAddUserPage