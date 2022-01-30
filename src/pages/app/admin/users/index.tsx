import {context} from "@opentelemetry/api";
import {GetServerSidePropsContext} from "next";
import {UserService} from "../../../../services/UserService";
import {FirebaseAdminService} from "../../../../services/FirebaseAdminService";
import {AppUser} from "../../../../models/AppUser";
import styled from "styled-components";
import {useState} from "react";
import Link from "next/link";

const StyleTable = styled.table`

  text-align: left;
  width: 100%;
  
  input {
    border: 1px solid black;
    color: black;
  }

`

interface UsersPageProps {
    users: AppUser[]
}

const UsersPage = ({users} : UsersPageProps) => {

    return (
        <>
            <StyleTable width={"100%"}>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Scope</th>
                    <th>Image</th>
                    <th></th>
                </tr>
                {users.map((user) => {
                    return (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.primaryEmail}</td>
                            <td>{user.scope?.map((scope) => {return (scope + ", ")})}</td>
                            <td>{user.picture ? <img src={user.picture}/> : null}</td>
                            <td><Link href={"/app/admin/users/" +  user.id}>Edit</Link></td>
                        </tr>
                    )
                })}
            </StyleTable>
        </>
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