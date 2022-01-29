import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {UserService} from "../../services/UserService";
import {FirebaseAdminService} from "../../services/FirebaseAdminService";
import {AppUser} from "../../models/AppUser";

interface ProfilePageProps {
    user: AppUser
}

const ProfilePage = ({user} : ProfilePageProps) => {

    return (
        <>
            <p>Profile</p>
            <p>{user.firstName}</p>
            {user.picture ? <img src={user.picture}/> : null }
        </>
    )

}

export const getServerSideProps : GetServerSideProps = async(context: GetServerSidePropsContext) => {
    const user = await new UserService(new FirebaseAdminService()).getUserFromToken(context.req.cookies.token)

    console.log(user)

    if (user != undefined) {
        return {
            props: {
                user: user
            }
        }
    } else {
        return {
            props : {
                user: null
            }
        }
    }
}

export default ProfilePage