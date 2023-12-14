import React, { useContext } from "react";
import ThemeButton from "./themeButton";
import AllBoards from "./allBoards";
import styled from "styled-components";
import lightLogo from "../assets/logo-dark.svg";
import darkLogo from "../assets/logo-light.svg";
import { BoardButton } from "./allBoards";
import hideSidebar from "../assets/icon-hide-sidebar.svg";

const LightLogo = styled.img`
  display: ${(props) => (props.theme.theme == "dark" ? "none" : "block")};
  padding: 2rem;
  //   height: 80px;
  margin-bottom: 4rem;
`;
const DarkLogo = styled.img`
  display: ${(props) => (props.theme.theme == "light" ? "none" : "block")};
  padding: 2rem;
  //   height: 80px;
  margin-bottom: 4rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 24vw;
  min-width: 16rem;
  height: 100vh;
  color: var(--White);
  background: var(--primary);
  border-right: solid 1px var(--lines);

  &p {
    margin: 0 0 2rem 2rem;
    color: var(--Medium-Grey, #828fa3);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15rem;
  }
`;
const ScrollContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  max-height: 60%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  // gap: 1rem;
  // border: solid 2px red;
`;
export default function ({ setIsSidebar }) {
  return (
    <Container className="not-on-mobile">
      <DarkLogo src={darkLogo} className="not-on-mobile" alt="" />
      <LightLogo src={lightLogo} className="not-on-mobile" alt="" />
      <ScrollContainer>
        <AllBoards />
      </ScrollContainer>
      <ThemeButton />
      <BoardButton className="hideSidebar" onClick={() => setIsSidebar(false)}>
        <img src={hideSidebar} alt="" style={{ marginRight: "1rem" }} />
        Hide Sidebar
      </BoardButton>
    </Container>
  );
}
