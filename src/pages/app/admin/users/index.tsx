import {context} from "@opentelemetry/api";
import {GetServerSidePropsContext} from "next";
import {UserService} from "../../../../services/UserService";
import {FirebaseAdminService} from "../../../../services/FirebaseAdminService";
import {AppUser} from "../../../../models/db/AppUser";
import styled from "styled-components";
import {useState} from "react";
import Link from "next/link";
import AppPage from "../../../../components/AppPage";

const ContentContainer = styled.div`


  width: 100% - (100px * 2);

  padding: 50px 100px;
    

`

const StyleTable = styled.table`

  text-align: left;
  width: 100%;

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
    
    
    
    
    background-color: ${props => props.theme.colours.secondary.blue};
  }
  

`


interface UsersPageProps {
    users: AppUser[]
}

const UsersPage = ({users} : UsersPageProps) => {

    return (
        <AppPage>
            <ContentContainer>
            <StyleTable width={"100%"}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Scope</th>
                        {/*<th>Image</th>*/}
                        <th></th>
                    </tr>
                </thead>
                {users.map((user) => {
                    return (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.primaryEmail}</td>
                            <td>{user.scope?.map((scope) => {return (scope + ", ")})}</td>
                            {/*<td>{user.picture ? <img src={user.picture}/> : null}</td>*/}
                            <td><Link href={"/app/admin/users/" +  user.id}>Edit</Link></td>
                        </tr>
                    )
                })}
            </StyleTable>
            </ContentContainer>
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