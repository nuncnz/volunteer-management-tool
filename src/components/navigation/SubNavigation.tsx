import {useRouter} from "next/router";
import styled from "styled-components";
import {NavLinkData} from "../../models/app/NavLinkData";
import NavLink from "./NavLink";

const SubNavigationContainer = styled.div`
  width: 100% - (100px * 2);
  height: 3rem;

  padding: 0 100px;

  background-color: ${props => props.theme.colours.primary.light};

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  ul {

    list-style: none;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;


    li {
      padding-right: 50px;
    }

    #active-page {
      text-decoration: underline;
      color: ${props => props.theme.colours.secondary.red}
    }

    a {
      cursor: pointer;
      color: ${props => props.theme.colours.primary.dark};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

    }


    #back {

      transition: all 1s ease;

      font-size: 2rem;
      &:hover {
        text-decoration: none;
        opacity: 0.8;
      }


    }


`

const SubNavigation = (currentPath: string, links: NavLinkData[]) => {

    const router = useRouter()

    return (
        <SubNavigationContainer>
            <ul>
                <li><a  id={"back"} onClick={() => router.back()}>👈🏼</a></li>
                {links.map((link) => {
                    return NavLink(currentPath, link.url, link.linkText)
                })}
            </ul>
        </SubNavigationContainer>
    )
}

export default SubNavigation