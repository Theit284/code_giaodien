import React from "react";
import styled from "styled-components";
import ListTeam from "./components/ListTeam/ListTeam";
import ListUser from "./components/ListUser/ListUser";

export const TeamTabView = styled.div`
  display: flex;
  gap: 10px;
`;

const TeamTab = () => {
  return (
    <TeamTabView>
      <ListTeam />
      <ListUser />
    </TeamTabView>
  );
};

export default TeamTab;
