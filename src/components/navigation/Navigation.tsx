import Link from "next/link";
import {FC, ReactNode} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import {AppURL} from "../AppURL";
import {NavLinkData} from "../NavLinkData";
import SubNavigation from "./SubNavigation";
import NavLink from "./NavLink";
import {useAuth} from "../providers/AuthProvider";

const NavigationContainer = styled.div`

  width: 100% - (100px * 2);
  height: 7rem;

  padding: 0 100px;

  background-color: ${props => props.theme.colours.primary.dark};

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  color: ${props => props.theme.colours.primary.light};

  h2 {
    cursor: pointer;
    font-weight: bold;
    font-size: 2rem;

  }

  ul {
    display: flex;
    flex-direction: row;

    list-style: none;
    li {

      margin-left: 30px;

      cursor: pointer;

      a {
        text-decoration: none;
        color: inherit;
        font-weight: bold;
        font-size: 1.15rem;
      }

      #active-page {
        text-decoration: underline;
        color: ${props => props.theme.colours.secondary.yellow}
      }


      &:hover {
        text-decoration: underline;
      }

    }

  }

`


const Navigation : FC = () => {

    const admin = [
        new NavLinkData(AppURL.ADMIN_USERS, "Users"),
        new NavLinkData(AppURL.ADMIN_MEMBERS, "Members"),
        new NavLinkData(AppURL.ADMIN_GROUPS, "Groups")
    ]

    const finance = [
        new NavLinkData(AppURL.FINANCE_SPENDING_REQUESTS, "Spending Requests"),
    ]

    const attendance= [
        new NavLinkData(AppURL.ATTENDANCE_EVENTS, "Events"),
    ]

    const { firebaseClient } = useAuth()

    const pathname = useRouter().pathname

    let subNav: ReactNode

    switch (true) {
        case pathname.includes(AppURL.ADMIN):
            subNav = SubNavigation(pathname, admin)
            break

        case pathname.includes(AppURL.ATTENDANCE):
            subNav = SubNavigation(pathname, attendance)
            break

        case pathname.includes(AppURL.FINANCE):
            subNav = SubNavigation(pathname, finance)
            break
    }

    return (
        <>
            <NavigationContainer>
                <Link passHref={true} href={AppURL.DASHBOARD}><h2>PYF Internal App</h2></Link>
                <ul>
                    {NavLink(pathname, AppURL.ADMIN, "Admin 👨‍⚖️")}
                    {NavLink(pathname, AppURL.ATTENDANCE, "Attendance 👮‍♀️")}
                    {NavLink(pathname, AppURL.HAUORA, "Hauora 😷")}
                    {NavLink(pathname, AppURL.FINANCE, "Finance 💵")}
                    {NavLink(pathname, AppURL.PROFILE, "Profile 🙈")}
                    <li><a onClick={() => firebaseClient?.logOut()}>Logout 🔒</a></li>
                </ul>
            </NavigationContainer>
            {subNav}
        </>
    )

}

export default Navigation

