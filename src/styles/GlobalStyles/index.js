import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    vertical-align: baseline;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    border: 0px;
    font-weight: 500;
    color: #3c3c3c;
}

body {
    background-color: #f3f4f6;
}

h1, h2, h3, label {
    font-family: 'Fredoka One', cursive;
}

h1 {
    font-size: 31.475px;
}

h2 {
    font-size: 23.612px;
}

h3 {
    font-size: 17.713px;
}
`;
