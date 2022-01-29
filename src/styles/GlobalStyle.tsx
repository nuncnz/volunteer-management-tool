import {createGlobalStyle, DefaultTheme, GlobalStyleComponent} from "styled-components";
import normalize from "styled-normalize";

const GlobalStyle: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
    ${normalize}
    
    * {
      margin: 0;
      padding: 0;
      border: none;
      font-family: 'Raleway',sans-serif;
    }
    
    body {
      overflow-x: hidden;
    }
    
    hr {
      border: 2px solid;
    }

`

export default GlobalStyle


