import {useAuth} from "../../components/util/AuthProvider";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {scopedRoute} from "../../utils/ScopedRoute";

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