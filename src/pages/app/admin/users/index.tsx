import {GetServerSidePropsContext} from "next";
import {UserService} from "../../../../services/UserService";
import {FirebaseAdminService} from "../../../../services/FirebaseAdminService";
import {AppUser} from "../../../../models/db/AppUser";
import Link from "next/link";
import AppPage from "../../../../components/pages/AppPage";
import StyledTable from "../../../../components/tables/StyledTable";
import {useRouter} from "next/router";
import {getUserScopeText} from "../../../../models/db/sub-types/UserScope";

interface UsersPageProps {
    users: AppUser[]
}

const UsersPage = ({users} : UsersPageProps) => {

    const router = useRouter()

    return (
        <AppPage>
                <Link href={"/app/admin/users/add"}>Add User</Link>
                <StyledTable>
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
                            <tr id={"clickable"} key={user.id} onClick={() => router.push("/app/admin/users/"+user.id)}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.primaryEmail}</td>
                                <td>{user.scope?.map((scope) => {return (getUserScopeText(scope) + " | ")})}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </StyledTable>
        </AppPage>
    )

}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const users = await new UserService(new FirebaseAdminService()).getAllUsers()

    return {
        props: {
            users: users
        }
    }

}

export default UsersPage