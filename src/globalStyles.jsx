import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
 
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
    padding: 0;
    font: inherit;
    /* background: #fafafa; */
  }
  
  :root {
    // Color Variables
    --Main-Purple: #635fc7;
    --main-purple-hover: rgba(99, 95, 199, 0.25);
    --Black: #000112;
    --White: #fff;
    --Medium-Grey: #828fa3;
    --Red: #ea5555;
    --red-hover: #ff9898;

    // Theme
    --background: ${(props) =>
      props.theme.theme === "dark" ? "#20212C" : "#f4f7fd"};
    --primary: ${(props) =>
      props.theme.theme === "dark" ? "#2b2c37" : "#fff"};
    --text-color: ${(props) =>
      props.theme.theme === "dark" ? "#fff" : "#000112"};
    --lines: ${(props) =>
      props.theme.theme === "dark" ? "#3e3f4e" : "#e4ebfa"};
  }

//custom variable to allow display of an element based on the choosen theme
    .light-theme-only{
        display: ${(props) => (props.theme.theme == "dark" ? "none" : "block")};

    }
    .dark-theme-only{
        display: ${(props) =>
          props.theme.theme == "light" ? "none" : "block"};

    }

  

    @media (min-width: 768px) {
      .mobile-only {
          display: none;
        }
    }
    @media (max-width: 768px) {
        .not-on-mobile {
          display: none !important;
        }
    }

    body {
    // Additional body styles go here
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color:var(--background);
    button
    {
        height:2.8rem;
        &:hover{
            cursor:pointer
        }
    }
    }  
`;

export default GlobalStyles;
