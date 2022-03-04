import Navigation from "../ui/navigation/Navigation";
import styled from "styled-components";
import {ReactNode} from "react";

const PageContainer = styled.div`
    
    width: 100vw;
  min-height: 100vh;

`

const ContentContainer = styled.div`


  width: 100% - (100px * 2);

  padding: 50px 100px;


`

interface AppPageProps {
    children: ReactNode
}

const AppPage = ({children}: AppPageProps) => {

    return (
        <PageContainer>
            <Navigation />
            <ContentContainer>
                {children}
            </ContentContainer>
        </PageContainer>
    )

}

export default AppPage