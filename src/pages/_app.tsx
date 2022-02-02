import type { AppProps } from 'next/app'
import {AuthProvider} from "../components/util/AuthProvider";
import FirebaseClientService from "../services/FirebaseClientService";
import GlobalStyle from "../styles/GlobalStyle";
import {theme} from "../styles/theme";
import {ThemeProvider} from "styled-components";

const firebaseClient = new FirebaseClientService()

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider firebaseClient={firebaseClient}>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthProvider>
    )
}

export default MyApp
