import {GetServerSidePropsContext} from "next";
import {UserService} from "../../../../models/user/UserService";
import {FirebaseAdminService} from "../../../../models/firestore/FirebaseAdminService";
import {User} from "../../../../models/user/User";
import AppPage from "../../../../components/pages/AppPage";
import StyledTable from "../../../../components/tables/StyledTable";
import {useRouter} from "next/router";
import {getUserScopeText} from "../../../../models/user/UserScope";
import Button, {ButtonSize} from "../../../../components/Button";
import styled from "styled-components";
import AppUserForm from "../../../../components/forms/AppUserForm";
import {useState} from "react";
import Table from "../../../../components/tables/StyledTable";
import classToDto from "../../../../components/ClassToDto";

interface UsersPageProps {
    users: User[]
}


const UsersContent = styled.div`

  display: flex;
  flex-direction: row;
  align-items: start;

  ${Table} {
    margin-right: 100px;
  }

  > div {
    ${Button} {
      margin-top: 30px;
    }
  }
`

const UsersPage = ({users} : UsersPageProps) => {

    const router = useRouter()

    const [appUser, setAppUser] = useState<User | null>(null)


    const setUser = (id: string) => {
        const selectedUser = users.find((user) => {
            return user.id == id
        }) || null

        setAppUser(selectedUser)
    }

    return (
        <AppPage>
            <UsersContent>
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Scope</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => {
                            return (
                                <tr id={"clickable"} key={user.id} onClick={() => setUser(user.id!!)}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.primaryEmail}</td>
                                    <td>{user.scope?.map((scope) => {return (getUserScopeText(scope) + " | ")})}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    <Button label={"Create new user"} size={ButtonSize.REGULAR} onClick={() => setAppUser(null)} />
                </div>
                <AppUserForm appUser={appUser} appUserSetState={setAppUser}/>
            </UsersContent>
        </AppPage>
    )

}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const users = await new UserService(new FirebaseAdminService()).getAllUsers()

    return {
        props: {
            users: classToDto(users)
        }
    }
}

export default UsersPage