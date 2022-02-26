import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {

        colours: {
            primary: {
                dark: string,
                light: string
            },
            secondary: {
                red: string,
                yellow: string,
                blue: string
            }
        }

    }
}