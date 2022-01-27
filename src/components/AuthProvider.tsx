import {createContext, FC, useEffect, useState} from "react";
import nookies from 'nookies'
import {User} from "@firebase/auth";
import FirebaseClientService from "../services/FirebaseClientService";

const firebaseClient = new FirebaseClientService()

const AuthContext = createContext<{user: User | null}>({user: null})

export const AuthProvider : FC = ({children} : any) => {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        return firebaseClient.getAuth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null);
                nookies.set(undefined, 'token', '', { path: '/' });
            } else {
                const token = await user.getIdToken();
                setUser(user);
                nookies.set(undefined, 'token', token, { path: '/' });
            }
        });
    }, []);

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            const user = firebaseClient.getAuth().currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);

        // clean up setInterval
        return () => clearInterval(handle);
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}