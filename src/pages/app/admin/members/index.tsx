import {GetServerSidePropsContext} from "next";
import {FirebaseAdminService} from "../../../../models/firestore/FirebaseAdminService";
import AppPage from "../../../../components/pages/AppPage";
import {MemberService} from "../../../../models/member/MemberService";
import {Member} from "../../../../models/member/Member";
import {useRouter} from "next/router";
import StyledTable from "../../../../components/tables/StyledTable";
import Table from "../../../../components/tables/StyledTable";
import {getVaccinationStatusText} from "../../../../models/member/VaccinationStatus";
import MemberForm from "../../../../components/forms/MemberForm";
import styled from "styled-components";
import Button, {ButtonSize} from "../../../../components/Button";
import {useState} from "react";
import classToDto from "../../../../components/ClassToDto";


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
                    </StyledTable>
                    <Button label={"Create new member"} size={ButtonSize.REGULAR} onClick={() => setSelectedMember(null)} />
                </div>
                <MemberForm member={selectedMember} memberSetState={setSelectedMember}/>
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