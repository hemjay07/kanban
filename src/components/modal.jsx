import React from "react";
import styled from "styled-components";
const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.5;
  z-index: 1;
`;
export default function ({ visibilitySetter }) {
  return (
    <ModalContainer onClick={() => visibilitySetter(false)}></ModalContainer>
  );
}
