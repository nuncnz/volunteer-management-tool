import {GetServerSidePropsContext} from "next";
import {FirebaseAdminService} from "../../../../models/firestore/FirebaseAdminService";
import AppPage from "../../../../components/pages/AppPage";
import {MemberService} from "../../../../models/member/MemberService";
import {Member} from "../../../../models/member/Member";
import {useRouter} from "next/router";
import StyledTable from "../../../../components/ui/tables/StyledTable";
import Table from "../../../../components/ui/tables/StyledTable";
import {getVaccinationStatusText} from "../../../../models/member/VaccinationStatus";
import MemberForm from "../../../../components/ui/forms/MemberForm";
import styled from "styled-components";
import Button, {ButtonSize, ButtonStyle} from "../../../../components/ui/Button";
import {useState} from "react";
import classToDto from "../../../../models/util/ClassToDto";


interface AdminMembersPageProps {
    members: Member[]
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


const AdminMembersPage = ({members} : AdminMembersPageProps) => {

    const router = useRouter()

    const [selectedMember, setSelectedMember] = useState<Member | null>(null)

    const setMember = (id: string) => {
        const selectedMember = members.find((member) => {
            return member.id == id
        }) || null

        setSelectedMember(selectedMember)
    }

    return (
        <AppPage>
            <UsersContent>
                <div>
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
                        <tbody>
                        {members?.map((user) => {
                            return (
                                <tr id={"clickable"} key={user.id} onClick={() => setMember(user.id!!)}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.primaryEmail}</td>
                                    <td>{user.dateOfBirth}</td>
                                    <td>{getVaccinationStatusText(user.vaccinationStatus)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </StyledTable>
                    <Button label={"Create new member"} styling={ButtonStyle.PRIMARY} size={ButtonSize.REGULAR} onClick={() => setSelectedMember(null)} />
                </div>
                <MemberForm successCallback={() => {console.log("Success")}} errorCallback={() => {console.log("Error")}}/>
            </UsersContent>
        </AppPage>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const members = await new MemberService(new FirebaseAdminService()).getAllMembers()

    return {
        props: {
            members: classToDto(members)
        }
    }
}

export default AdminMembersPage