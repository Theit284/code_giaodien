import React, { useEffect, useState } from "react";
import styled from "styled-components";
import user from "../../asset/images/user.png";
import bgrSidebar from "../../asset/images/bgrSidebar.jpg";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StartIcon from "@mui/icons-material/Start";
import HomeIcon from "@mui/icons-material/Home";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import AddIcon from "@mui/icons-material/Add";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
// import Content from '../content/conten';
import { Link, useNavigate } from "react-router-dom";
import { removeAccessToken } from "../../utils/LocalStorage";
import { useDispatch } from "react-redux";
import authSlice from "../../redux/reducers/authReducer";

const SidebarContainer = styled.div`
  width: 300px;
  height: 100%;
  margin-top: 100px;
  position: fixed;
  background-color: white;
`;
const User = styled.div`
  background-image: url(${bgrSidebar});
  background-repeat: no-repeat;
  padding: 20px 15px 0;
  position: relative;
  width: 271px;
`;

const Use_info = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    padding-right: 10px;
  }
`;

const Title = styled.div`
  color: #ffffff;
  font-size: 14px;
`;
const Logout = styled.div`
  div {
    display: flex;
    justify-content: flex-end;
    color: #ffffff;
    /* position: relative; */
    cursor: pointer;
  }
`;
const ButtonLogout = styled.div`
  display: flex;
  position: absolute;
  background: red;
  right: 0px;
  top: 90px;
  border: 1px solid;
  padding: 5px;
  border-radius: 5px;
  :hover {
    background: #e9e9e9;
  }
`;

const StyleLink = styled(Link)`
  color: #000000;
  text-decoration: none;
`;

const FooterSidebar = styled.div`
  /* margin-top: 308px; */
  display: flex;
  border-top: 1px solid #ccc;
  position: absolute;
  top: 602px;
`;
const Content_Footer = styled.div`
  margin-top: 30px;
  width: 300px;
  p {
    margin: 0;
    font-size: 14px;
    margin-left: 10px;
  }
  /* ul li{{
    list-style: none;
    font-size: 14px;
   
  }} */
`;
const Strong = styled.strong`
  color: red;
`;

const Lists = styled.div`
  margin-top: 27px;
  height: 200px;
`;

const Sidebar = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [btn, setBtn] = useState(false);
  const [check, setCheck] = useState(false);
  const handleClickBtn = (e) => {
    setCheck(true);
    setBtn((prev) => !prev);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeAccessToken();
    dispatch(authSlice.actions.removeToken());
    navigate("/account/login");
  };
  useEffect(() => {
    document.addEventListener("click", () => {
      if (!check && btn) {
        setBtn(false);
        setCheck(false);
      }
      console.log(btn);
    });
  });

  return (
    <SidebarContainer>
      <User>
        <Use_info>
          <Info>
            <img alt="" src={`${user}`} />
            <div>
              <Title>Admin</Title>
              <Title>admin.ncc@ncc.asia</Title>
            </div>
          </Info>
        </Use_info>
        <Logout>
          <div id="the" onClick={(e) => handleClickBtn(e)}>
            <KeyboardArrowDownIcon />
          </div>
          {btn ? (
            <ButtonLogout onClick={handleLogout}>
              <div>
                <StartIcon />
                Logout
              </div>
            </ButtonLogout>
          ) : null}
        </Logout>
      </User>
      <Lists>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
            ></ListSubheader>
          }
        >
          <StyleLink to="/home">
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home Page" />
            </ListItemButton>
          </StyleLink>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <GroupWorkIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
            {open ? <HorizontalRuleIcon /> : <AddIcon />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <StyleLink to="/home/task">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ImportContactsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tasks" />
                </ListItemButton>
              </StyleLink>
              <StyleLink to="/home/projects">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ImportContactsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Project" />
                </ListItemButton>
              </StyleLink>
            </List>
          </Collapse>
          <StyleLink to="/home/projects">
            <ListItemButton>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Project" />
            </ListItemButton>
          </StyleLink>
          <ListItemButton>
            <ListItemIcon>
              <AccessAlarmIcon />
            </ListItemIcon>
            <ListItemText primary="My timesheets" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <ListItemText primary="Timesheets" />
          </ListItemButton>
        </List>
      </Lists>
      <FooterSidebar>
        <Content_Footer>
          <p>
            &2022 <Strong>Timesheet.</Strong>
          </p>
          <p>
            <b>Version</b> 4.3.0[20221608]
          </p>
        </Content_Footer>
      </FooterSidebar>
    </SidebarContainer>
  );
};

export default Sidebar;
