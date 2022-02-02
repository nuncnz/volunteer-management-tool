import {NextPage} from "next";
import styled from "styled-components";
import Link from 'next/link'

const PageContainer = styled.div`

  width: 100vw;
  height: 100vh;

  display: flex;

  flex-direction: row;

`

const SplashContainer = styled.div`

  width: 70%;
  height: 100%;

  background: black;

  display: flex;
  justify-content: center;
  align-items: center;

  div {

    width: 80%;
    height: 60%;

    color: white;

    display: flex;

    flex-direction: column;

    justify-content: space-between;

    h1 {
      padding: 0;
      margin: 0;
      font-size: 5em;
      font-weight: 900;
    }

    p {
      font-size: 1.5em;
      font-style: italic;
      font-weight: 200;
    }
  }


`

const LoginContainer = styled.div`

  width: 30%;
  height: 100%;

  background: white;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 80%;

    h2 {
      text-decoration: underline;

      cursor: pointer;

      transition: 0.3s all;
      &:hover {
        opacity: 0.9;
        transform: scale(1.06);
      }

    }

  }


`

const Home: NextPage = () => {


    return (

        <PageContainer>
            <SplashContainer>
                <div>
                    <h1>Make managing your volunteers easy.</h1>
                    <p>A product developed by <span>NUNC</span></p>
                </div>
            </SplashContainer>

            <LoginContainer>
                <div>
                    <Link href={"/auth"}><h2>Log in to get started</h2></Link>
                </div>
            </LoginContainer>
        </PageContainer>

    )

}

export default Home