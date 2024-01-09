import React from "react";
import styled from "styled-components";
import ThemeButton from "./themeButton";
import AllBoards from "./allBoards";
import Modal from "./modal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 1rem;
  padding: 1rem 0;
  width: 85vw;
  max-width: min(20rem, 95vw);
  height: 20rem;
  background: var(--primary);
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  border-radius: 0.5rem;
  box-shadow: 0px 10px 20px 0px rgba(54, 78, 126, 0.25);
`;
const ScrollContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  max-height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;
export default function ({ isMobileDropDown, setIsMobileDropDown }) {
  return (
    isMobileDropDown && (
      <React.Fragment>
        {/* the modal is used for any component that needs a model, all you have to do is to provide the setter which sets the state of the component to false when the modal is clicked */}
        <Modal visibilitySetter={setIsMobileDropDown} />
        <Container className={"mobile-only"}>
          <ScrollContainer>
            <AllBoards setIsMobileDropDown={setIsMobileDropDown} />
          </ScrollContainer>
          <ThemeButton />
        </Container>
      </React.Fragment>
    )
  );
}
