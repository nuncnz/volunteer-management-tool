import {useAuth} from "../../components/AuthProvider";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

interface AuthPageProps {
    redirectUrl: string
}

const AuthPage = ({redirectUrl} : AuthPageProps) => {

    console.log(redirectUrl)

    const {user, firebaseClient} = useAuth()

    return (
        <>
            <button onClick={() => firebaseClient?.signInWithGoogle(redirectUrl)}>Sign in</button>
            <button onClick={() => firebaseClient?.logOut()}>Sign Out</button>
            <button onClick={() => console.log(user)}>Show user</button>
        </>
    )

}

export const getServerSideProps: GetServerSideProps = async (context : GetServerSidePropsContext) => {

    console.log(context.query.redirect)

    if (context.query.redirect != null) {
        return {
            props: {
                redirectUrl: context.query.redirect
            }
        }
    } else {
        return {
            props: {
                redirectUrl: "/app/dashboard"
            }
        }
    }


}

export default AuthPage