import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
@font-face {
    font-family: "Neutral Sans";
    src: url("https://db.onlinewebfonts.com/t/bf015bb4130c2f06c7a3060579578f0c.eot");
    src: url("https://db.onlinewebfonts.com/t/bf015bb4130c2f06c7a3060579578f0c.eot?#iefix")format("embedded-opentype"),
    url("https://db.onlinewebfonts.com/t/bf015bb4130c2f06c7a3060579578f0c.woff2")format("woff2"),
    url("https://db.onlinewebfonts.com/t/bf015bb4130c2f06c7a3060579578f0c.woff")format("woff"),
    url("https://db.onlinewebfonts.com/t/bf015bb4130c2f06c7a3060579578f0c.ttf")format("truetype"),
    url("https://db.onlinewebfonts.com/t/bf015bb4130c2f06c7a3060579578f0c.svg#Neutral Sans")format("svg");
}
body{
    line-height: 1.6;
    font-family: "Neutral Sans";
    overflow-x:hidden;
    background-color: #58d8db;
}

html{
    scrollbar-width: none;
    -ms-overflow-style: none;
}

body::-webkit-scrollbar{
    display: none;
}

`;
