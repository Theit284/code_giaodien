import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import styled from "styled-components";
import {
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { pushUser } from "../../../../../../../../../../redux/reducers/projectReducer";
import { unselectedUserSelector } from "../../../../../../../../../../redux/selector/selectorProject";

const ListUserView = styled.div`
  width: 35%;
  height: 100%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-bottom: 1px solid rgba(60, 64, 67, 0.3);
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderText = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

const ListUserContent = styled.div``;
const SearchUser = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 15px;
`;
const SelectUser = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const List = styled.div`
  max-height: 50vh;
  overflow: auto;
  & table {
    width: 100%;
    color: #555555;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-collapse: collapse;

    & td {
      display: flex;
      padding-top: 5px;
      align-items: center;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    & tr {
      background-color: #f6f6f6;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      &:nth-child(even) {
        background: white;
      }
      &:hover {
        background: #f1f1f1;
      }
    }
  }
`;
const UserInfo = styled.div`
  display: flex;

  & img {
    width: 60px;
    border-radius: 50%;
  }
`;

const UserName = styled.div`
  font-size: 14px;
  margin-left: 10px;
  & p,
  strong {
    margin: 5px;
  }
`;

const StyleSpan = styled.span`
  font-weight: 600;
  color: #fff;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 10px;
  background: ${(props) => props.color};
`;

const ListUser = () => {
  const position = ["Staff", "Internship", "Collaborator"];
  const color = ["#f44336", "#4caf50", "#2196f3"];

  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };

  const [branch, setBranch] = useState(0);
  const handleChangeBranch = (event) => {
    setBranch(event.target.value);
  };

  const [type, setType] = useState(-1);
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const [searchText, setSearchText] = useState("");
  const [value] = useDebounce(searchText, 1000);

  const dispatch = useDispatch();
  const users = useSelector(unselectedUserSelector);

  const searchedUsers = users.filter((user) => {
    const filterUser = user.emailAddress.includes(value);
    if (branch === 0 && type === -1) {
      return filterUser;
    }
    if (branch === 0 && type > -1) {
      return user.type === type && filterUser;
    }
    if (branch > 0 && type === -1) {
      return user.branchId === branch && filterUser;
    }
    return user.branchId === branch && user.type === type && filterUser;
  });

  const handlePush = (user) => {
    dispatch(pushUser(user));
  };

  return (
    <ListUserView>
      <Header onClick={handleOpen}>
        <HeaderText>Select team member</HeaderText>
        {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Header>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListUserContent>
          <SearchUser>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 70 }}>
              <InputLabel>Branch</InputLabel>
              <Select
                value={branch}
                onChange={handleChangeBranch}
                style={{ fontSize: "14px" }}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>Ha Noi 1</MenuItem>
                <MenuItem value={2}>1</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 70 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                onChange={handleChangeType}
                style={{ fontSize: "14px" }}
              >
                <MenuItem value={-1}>All</MenuItem>
                <MenuItem value={0}>Staff</MenuItem>
                <MenuItem value={1}>Internship</MenuItem>
                <MenuItem value={2}>Collaborator</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Search"
              variant="standard"
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
          </SearchUser>
          <List>
            <table>
              {searchedUsers.map((user, index) => (
                <tr key={index}>
                  <td
                    onClick={() => {
                      handlePush(user);
                    }}
                  >
                    <ArrowBackIosIcon sx={{ padding: "0 10px" }} />
                    <UserInfo>
                      <img src="" alt="Avatar" />
                      <UserName>
                        <strong>
                          {user.name}
                          {position[user.type] ? (
                            <StyleSpan color={color[user.type]}>
                              {position[user.type]}
                            </StyleSpan>
                          ) : null}

                          <StyleSpan color={"rgb(137, 207, 240)"}>
                            Fresher
                          </StyleSpan>
                        </strong>
                        <p>{user.emailAddress}</p>
                      </UserName>
                    </UserInfo>
                  </td>
                </tr>
              ))}
            </table>
          </List>
        </ListUserContent>
      </Collapse>
    </ListUserView>
  );
};

export default ListUser;
