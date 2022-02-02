import {context} from "@opentelemetry/api";
import {GetServerSidePropsContext} from "next";
import {UserService} from "../../../../services/UserService";
import {FirebaseAdminService} from "../../../../services/FirebaseAdminService";
import {AppUser} from "../../../../models/db/AppUser";
import styled from "styled-components";
import {useState} from "react";
import Link from "next/link";
import AppPage from "../../../../components/AppPage";
import {MemberService} from "../../../../services/MemberService";
import {Member} from "../../../../models/db/Members";
import {AppURL} from "../../../../models/AppURL";

const ContentContainer = styled.div`


  width: 100% - (100px * 2);

  padding: 50px 100px;
    

`

const StyleTable = styled.table`

  text-align: left;
  width: 60%;

  input {
    border: 1px solid black;
    color: black;
  }
  
  border-spacing: 0;
  
  
  
  
  td {
    padding: 15px 0;
    border-bottom: 2px solid black;
    
    img {
      margin: 10px;
    }
    
  }
  
  th {
    height: 3rem;
  }

  th, td {
    padding-left: 15px;
  }
  
  thead {
    
    
    
    
    background-color: ${props => props.theme.colours.primary.dark};
    color: ${props => props.theme.colours.primary.light};
  }
  

`


interface AdminMembersPageProps {
    members: Member[]
}

const AdminMembersPage = ({members} : AdminMembersPageProps) => {

    return (
        <AppPage>
            <ContentContainer>
                <Link href={AppURL.ADMIN_MEMBERS_ADD}>Add</Link>
                <StyleTable width={"100%"}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Vaccination Status?</th>
                        {/*<th>Image</th>*/}
                        {/*<th></th>*/}
                    </tr>
                    </thead>
                    {members?.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>🚩</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.primaryEmail}</td>
                                <td>{user.dateOfBirth}</td>
                                <td>✅</td>
                                {/*<td>{user.picture ? <img src={user.picture}/> : null}</td>*/}
                                {/*<td><Link href={"/app/admin/users/" +  user.id}>Edit</Link></td>*/}
                            </tr>
                        )
                    })}
                </StyleTable>
            </ContentContainer>
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