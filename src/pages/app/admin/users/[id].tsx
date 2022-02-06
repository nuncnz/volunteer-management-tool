import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {AppUser} from "../../../../models/db/AppUser";
import {UserService} from "../../../../services/UserService";
import {FirebaseAdminService} from "../../../../services/FirebaseAdminService";
import {useState} from "react";
import {getUserScopeText, UserScope, UserScopeList} from "../../../../models/db/sub-types/UserScope";
import _ from "lodash";
import AppPage from "../../../../components/pages/AppPage";
import Form from "../../../../components/forms/Form";
import {useRouter} from "next/router";

interface UserByIdPageProps {
    user: AppUser
}

const UserByIdPage = ({user} : UserByIdPageProps) => {

    const router = useRouter()

    const newUser = new AppUser(user)

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [secondaryEmail, setSecondaryEmail] = useState(user.secondaryEmail)
    const [scopes, setScope] = useState(user.scope)
    const [picture, setPicture] = useState(user.picture)

    const updateUser = async () => {
        // const newUser = new AppUser({firstName: firstName, lastName: lastName, primaryEmail: user.primaryEmail, id: user.id, secondaryEmail: secondaryEmail, user.googleUid, scopes, picture})

        user.firstName = firstName
        user.lastName = lastName
        user.secondaryEmail = secondaryEmail
        user.scope = scopes
        user.picture = picture

        console.log(scopes)

        if (!_.isEqual(new AppUser(user), newUser)) {
            const options = {
                method: "POST",
                body: JSON.stringify(user)
            }

            await fetch("/api/users/update", options).then((res) => {
                if (res.status == 200) {
                    router.push("/app/admin/users")
                }
            })
        }
    }

    const updateUserScope = (userScope: UserScope) => {
        let test = scopes?.find((use) => {
            return use == userScope
        })

        if (test == undefined) {
            if (scopes != null) {
                setScope([userScope, ...scopes])
            } else {
                setScope([userScope])
            }
        } else {
            let test = scopes?.filter((scope) => {
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

        scopes?.forEach((scope) => {
            if (scope == userScope) {
                exists = true
            }
        })

        return exists

    }

    return (
        <AppPage>
            <Form>
                <div>
                    <div id={"input"}>
                        <h3>First Name</h3>
                        <input type={"text"} value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                    </div>
                    <div id={"input"}>
                        <h3>Last Name</h3>
                        <input type={"text"} value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                    </div>
                    <div id={"input"}>
                        <h3>Secondary Email</h3>
                        <input type={"text"} value={secondaryEmail ? secondaryEmail : ""} onChange={(e) => {setSecondaryEmail(e.target.value)}}/>
                    </div>
                    {/*<p>{scopes?.map((scope: UserScope) => {*/}
                    {/*    return (*/}
                    {/*        <li key={scope}>{scope}</li>*/}
                    {/*    )*/}
                    {/*})}</p>*/}
                    <fieldset>
                        <legend>Scopes</legend>
                        {UserScopeList.map((scope) => {
                            return (
                                <div key={scope}>
                                    <input type="checkbox" value={scope} checked={isChecked(scope)} onChange={(e) => updateUserScope(scope)}/>
                                    <label>{getUserScopeText(scope)}</label>
                                </div>
                            )
                        })}

                    </fieldset>
                    <button onClick={() => updateUser()}>Update User</button>
                </div>
            </Form>

        </AppPage>
    )
}


export const getServerSideProps : GetServerSideProps = async (context : GetServerSidePropsContext) => {

    const user = await new UserService(new FirebaseAdminService()).getUserById(context.query.id as string)

    return {
        props: {
            user: user
        }
    }

}


export default UserByIdPage