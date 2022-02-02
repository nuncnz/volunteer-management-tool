import Navigation from "./Navigation";
import styled from "styled-components";
import {ReactNode} from "react";

const PageContainer = styled.div`
    
    width: 100vw;
  min-height: 100vh;

`

interface AppPageProps {
    children: ReactNode
}

const AppPage = ({children}: AppPageProps) => {

    return (
        <PageContainer>
            <Navigation />
                {children}
        </PageContainer>
    )

}

export default AppPage