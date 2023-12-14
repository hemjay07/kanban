import React, { useState, createContext } from "react";
import GlobalStyles from "../globalStyles.jsx";
import { ThemeProvider } from "styled-components";
import Home from "../pages/home.jsx";
import data from "../data.json";

export const ThemeContext = createContext();

// this context is used to switch between boards, when a board is clicked on the sidebar, the click event changes the context to that particular board and this is used to render the corresponding columns
export const SelectedBoard = createContext();

export default function () {
  const [theme, setTheme] = useState("dark");
  const [selectedBoard, setSelectedBoard] = useState(data.boards[0]?.name);

  return (
    // Realized the theme provider from styled compnent only provides the theme for styling of a styled component and the theme is therefore not available for the app logic. I therefore have to provide a themeContext to serve the app the theme and use that same them for styling the components
    <SelectedBoard.Provider value={{ selectedBoard, setSelectedBoard }}>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        <ThemeProvider theme={{ theme: theme }}>
          <GlobalStyles />
          <Home />
        </ThemeProvider>
      </ThemeContext.Provider>
    </SelectedBoard.Provider>
  );
}
