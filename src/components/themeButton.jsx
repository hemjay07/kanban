import React, { useContext } from "react";
import { ThemeContext } from "../app/App";

import styled from "styled-components";
import iconDark from "../assets/icon-dark-theme.svg";
import iconlight from "../assets/icon-light-theme.svg";
import darkModeSet from "../assets/dark-mode-set.svg";
import lightModeSet from "../assets/light-mode-set.svg";
const ThemeButton = styled.button`
  width: 90% !important;
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
  margin: auto;
  margin-bottom: 0;
  margin-top: auto;
  background: var(--background) !important;
  border-radius: 6px !important;
  border: none;
  &:hover {
    background: var(--main-purple-hover) !important;
  }
`;
export default function () {
  const { setTheme } = useContext(ThemeContext);

  return (
    <ThemeButton
      onClick={() => setTheme((prev) => (prev == "dark" ? "light" : "dark"))}
    >
      <img src={iconlight} alt="" />
      <img src={darkModeSet} className="dark-theme-only" alt="" />
      <img src={lightModeSet} className="light-theme-only" alt="" />
      <img src={iconDark} alt="" />
    </ThemeButton>
  );
}
