import React from "react";
import styled from "styled-components";
import ListTeam from "./compoments/ListTeam/ListTeam";
import ListUser from "./compoments/ListUser/ListUser";

const TeamTabView = styled.div`
  display: flex;
  gap: 10px;
`;

const TeamTab = () => {
  // console.log("re-render");
  return (
    <TeamTabView>
      <ListTeam />
      <ListUser />
    </TeamTabView>
  );
};

export default TeamTab;
