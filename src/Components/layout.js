import React from "react";
import styled from "styled-components";
import Header from "./header/header";
import MainView from "./content/conten";
import SideBar from "./sidebar/Sidebar";

const MainContent = styled.div`
  display: flex;
`;

const Layout = () => {
  return (
    <div>
      <Header />
      <MainContent>
        <SideBar />
        <MainView />
      </MainContent>
    </div>
  );
};

export default Layout;
