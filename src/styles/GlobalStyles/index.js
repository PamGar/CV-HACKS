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
}

h1,h2,h3,h4,h5,h6,p,span,strong,em,blockquote,code,pre,ul,li,ol,dl,dt,mark,ins,del,sup,sub,small,i,b{
    color:#5e5e5e;
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
