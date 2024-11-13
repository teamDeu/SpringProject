import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`    
  ${reset}   
  #root {
    font-family : "nanum"
  }    
`;

export default GlobalStyle;