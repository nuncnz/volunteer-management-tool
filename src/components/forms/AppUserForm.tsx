import {User} from "../../models/user/User";
import {getUserScopeText, UserScope, UserScopeList} from "../../models/user/UserScope";
import BaseForm from "./BaseForm";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Button, {ButtonSize} from "../Button";
import styled from "styled-components";
import {CustomComponentProps} from "../CustomComponentProps";

interface UserFormProps extends CustomComponentProps {
    appUser?: User | null
    appUserSetState:  Dispatch<SetStateAction<User | null>>
}

const UserForm = ({appUser = null, appUserSetState} : UserFormProps) => {

    const [isNew, setIsNew] = useState<boolean>(appUser == null)
    const [firstName, setFirstName] = useState<string>(isNew ? "" : appUser!!.firstName)
    const [lastName, setLastName] = useState<string>(isNew ? "" : appUser!!.lastName)
    const [primaryEmail, setPrimaryEmail] = useState<string>(isNew ? "" : appUser!!.primaryEmail)
    const [scope, setScope] = useState<Array<UserScope> | null>(isNew ? null : appUser!!.scope)

    useEffect(() => {
        setIsNew(appUser == null)
        setFirstName(isNew ? "" : appUser!!.firstName)
        setLastName(isNew ? "" : appUser!!.lastName)
        setPrimaryEmail(isNew ? "" : appUser!!.primaryEmail)
        setScope(isNew ? null : appUser!!.scope)
    }, [appUser, isNew])

    const router = useRouter()

    const handleFormSubmit = async () => {

        if (
            primaryEmail == "" ||
            scope == null ||
            firstName == "" ||
            lastName == ""
        ) {
            // throw an error somehow?
            console.log("Data is missing or invalid")
            return
        }

        const userObj = new User({
                                        firstName: firstName,
                                        lastName: lastName,
                                        primaryEmail: primaryEmail,
                                        id: appUser?.id,
                                        secondaryEmail: appUser?.secondaryEmail,
                                        googleUid: appUser?.googleUid, scope: scope,
                                        picture: appUser?.picture})

        const options = {
            method: "POST",
            body: JSON.stringify(userObj)
        }

        await fetch("/api/users", options).then(async (res) => {
            if (res.status == 200) {
                appUserSetState(null)
                await router.replace("/app/admin/users")
            }
        })
    }

    const updateUserScope = (userScope: UserScope) => {
        let test = scope?.find((use) => {
            return use == userScope
        })

        if (test == undefined) {
            if (scope != null) {
                setScope([userScope, ...scope])
            } else {
                setScope([userScope])
            }
        } else {
            let test = scope?.filter((scope) => {
                return scope != userScope
            })

            if (test == undefined) {
                setScope(null)
            } else {
                setScope(test)
            }
        }
    }

    const isChecked = (userScope: UserScope) => {
        let exists = false
        scope?.forEach((scope) => {
            if (scope == userScope) {
                exists = true
            }
        })
        return exists
    }

    return (
        <BaseForm>
            <div>
                {appUser?.picture ? <img src={appUser?.picture} /> : null}
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
                    <input disabled={!isNew} value={primaryEmail} type={"text"} onChange={(e) => setPrimaryEmail(e.target.value)}/>
                </div>
                <div id={"checkboxes"}>
                    <h3>User Scopes</h3>
                    {UserScopeList.map((scope) => {
                        return (
                            <div key={scope}>
                                <input type="checkbox" value={scope} checked={isChecked(scope)} onChange={(e) => updateUserScope(scope)}/>
                                <label>{getUserScopeText(scope)}</label>
                            </div>
                        )
                    })}
                </div>
                <Button onClick={() => handleFormSubmit()} label={isNew ? "Create" : "Update"}  size={ButtonSize.REGULAR}/>
            </div>
        </BaseForm>
    )

}

const AppUserForm = styled(UserForm)``

export default AppUserForm