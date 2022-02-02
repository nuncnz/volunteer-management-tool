import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {AppUser} from "../../../../models/db/AppUser";
import {UserService} from "../../../../services/UserService";
import {FirebaseAdminService} from "../../../../services/FirebaseAdminService";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {UserScope} from "../../../../models/db/UserScope";
import _ from "lodash";
import AppPage from "../../../../components/AppPage";

const StyledInput = styled.input`

  border: 1px solid black;
  color: black;

`

const StyledDiv = styled.div`


  display: flex;
  flex-direction: column;


`

interface UserByIdPageProps {
    user: AppUser
}

const UserByIdPage = ({user} : UserByIdPageProps) => {

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [secondaryEmail, setSecondaryEmail] = useState(user.secondaryEmail)
    const [scopes, setScope] = useState(user.scope)
    const [picture, setPicture] = useState(user.picture)

    const updateUser = async () => {
        const newUser = new AppUser(firstName, lastName, user.primaryEmail, user.id, secondaryEmail, user.googleUid, scopes, picture)

        if (_.isEqual(user, newUser.toDbo())) {
            console.log("No changes were made!")
        } else {
            const options = {
                method: "POST",
                body: JSON.stringify(newUser)
            }

            await fetch("/api/users/update", options).then((res) => {
                console.log(res.json())
                console.log(res.status)
            })
        }
    }

    return (
        <AppPage>
            <StyledDiv>
                <StyledInput type={"text"} value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                <StyledInput type={"text"} value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                <StyledInput type={"text"} value={secondaryEmail ? secondaryEmail : ""} onChange={(e) => {setSecondaryEmail(e.target.value)}}/>
                <p>{scopes?.map((scope: UserScope) => {
                    return (
                        <li key={scope}>{scope}</li>
                    )
                })}</p>
                <img src={picture ? picture : ""} />
            </StyledDiv>
            <button onClick={() => updateUser()}>Update User</button>
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