import {useAuth} from "../../components/AuthProvider";

const AuthPage = () => {

    const {user, firebaseClient} = useAuth()

    return (
        <>
            <button onClick={() => firebaseClient?.loginWithGooglePopup()}>Sign in</button>
            <button onClick={() => firebaseClient?.logOut()}>Sign Out</button>
            <button onClick={() => console.log(user)}>Show user</button>
        </>
    )

}

export default AuthPage