import {GetServerSidePropsContext} from "next";
import {FirebaseAdminService} from "../../../../services/FirebaseAdminService";
import AppPage from "../../../../components/pages/AppPage";
import {MemberService} from "../../../../services/MemberService";
import {Member} from "../../../../models/db/Members";
import {useRouter} from "next/router";
import Link from "next/link"
import StyledTable from "../../../../components/tables/StyledTable";
import {getVaccinationStatusText} from "../../../../models/db/sub-types/VaccinationStatus";


interface AdminMembersPageProps {
    members: Member[]
}


const AdminMembersPage = ({members} : AdminMembersPageProps) => {

    const router = useRouter()

    return (
        <AppPage>
                <Link href={"/app/admin/members/add"}><a>Add User</a></Link>
                <StyledTable>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Vaccination Status?</th>
                    </tr>
                    </thead>
                    {members?.map((user) => {
                        return (
                            <tr id={"clickable"} key={user.id} onClick={()=> {router.push("/app/admin/members/"+user.id)}}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.primaryEmail}</td>
                                <td>{user.dateOfBirth}</td>
                                <td>{getVaccinationStatusText(user.vaccinationStatus)}</td>
                            </tr>
                        )
                    })}
                </StyledTable>
        </AppPage>
    )

}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const members = await new MemberService(new FirebaseAdminService()).getAllMembers()

    return {
        props: {
            members: members
        }
    }

}

export default AdminMembersPage