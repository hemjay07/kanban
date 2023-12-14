import React, { useState } from "react";
import { MainContent, Wrapper } from "./homeStyled";
import Navbar from "../components/navbar";
import Body from "../components/body";
import Sidebar from "../components/sidebar";
export default function () {
  const [isSidebar, setIsSidebar] = useState(true);
  const [isMobileDropDown, setIsMobileDropDown] = useState(false);
  return (
    <Wrapper>
      {isSidebar && <Sidebar setIsSidebar={setIsSidebar} />}
      <MainContent>
        <Navbar
          isSidebar={isSidebar}
          isMobileDropDown={isMobileDropDown}
          setIsMobileDropDown={setIsMobileDropDown}
        />
        <Body isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
      </MainContent>
    </Wrapper>
  );
}
