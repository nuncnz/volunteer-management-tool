import {createContext, ReactChild, ReactNode, useContext, useEffect, useState} from "react";
import nookies from 'nookies'
import {User} from "@firebase/auth";
import FirebaseClientService from "../services/FirebaseClientService";

const AuthContext = createContext<{user: User | null, firebaseClient: FirebaseClientService | null}>(
    {
        user: null,
        firebaseClient: null
    }
)

interface AuthProviderProps {
    firebaseClient: FirebaseClientService,
    children: ReactNode
}

export const AuthProvider = ({firebaseClient, children} : AuthProviderProps) => {

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
        <AuthContext.Provider value={{ user, firebaseClient }}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};