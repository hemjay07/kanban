import React from "react";
import ThemeButton from "./themeButton";
import AllBoards from "./allBoards";
import styled from "styled-components";
import lightLogo from "../assets/logo-dark.svg";
import darkLogo from "../assets/logo-light.svg";
import hideSidebar from "../assets/icon-hide-sidebar.svg";

const LightLogo = styled.img`
  display: ${(props) => (props.theme.theme == "dark" ? "none" : "block")};
  padding: 2rem;
  margin-bottom: 4rem;
`;
const DarkLogo = styled.img`
  display: ${(props) => (props.theme.theme == "light" ? "none" : "block")};
  padding: 2rem;
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
`;
const HideSidebarButton = styled.button`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  gap: 0.75rem;
  width: 95%;
  padding: 0.5rem 0 0.5rem 1rem;
  margin: 0.5rem auto 2rem 0;
  border-radius: 0rem 6.25rem 6.25rem 0rem;
  color: var(--Medium-Grey);
  background: transparent;
  border: none;
  font-size: 0.9375rem;
  font-weight: 700;
  &:hover {
    color: var(--Main-Purple);
    background: var(--main-purple-hover);
  }
`;
export default function ({ setIsSidebar }) {
  return (
    <Container className="not-on-mobile">
      <DarkLogo src={darkLogo} alt="" />
      <LightLogo src={lightLogo} alt="" />
      <ScrollContainer>
        <AllBoards />
      </ScrollContainer>
      <ThemeButton />
      <HideSidebarButton
        className="hideSidebar"
        onClick={() => setIsSidebar(false)}
      >
        <img src={hideSidebar} alt="" style={{ marginRight: "1rem" }} />
        Hide Sidebar
      </HideSidebarButton>
    </Container>
  );
}
