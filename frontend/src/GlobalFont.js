import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import NanumSquareNeo from "./assets/fonts/NanumSquareNeo-Variable.woff";

const GlobalFont = createGlobalStyle`    
     @font-face {
        font-family: "nanum square neo";
        src: local("nanum"), url(${NanumSquareNeo}) format('woff'); 
        font-weight: normal;
    }
`;

export default GlobalFont;