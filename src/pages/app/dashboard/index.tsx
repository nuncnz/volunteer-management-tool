import {NextPage} from "next";
import Navigation from "../../../components/ui/navigation/Navigation";
import styled from "styled-components";

const PageContainer = styled.div`

    width: 100vw;
  min-height: 100vh;
    
`

const DashboardPage : NextPage = () => {

    return (
        <PageContainer>
            <Navigation />
        </PageContainer>
    )

}

export default DashboardPage