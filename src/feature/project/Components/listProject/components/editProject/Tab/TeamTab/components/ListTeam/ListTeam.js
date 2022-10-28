import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState } from "react";
import styled from "styled-components";
import {
  Checkbox,
  Collapse,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import {
  removeUser,
  updateType,
} from "../../../../../../../../../../redux/reducers/projectReducer";
import { selectedUserSelector } from "../../../../../../../../../../redux/selector/selectorProject";

const ListTeamView = styled.div`
  width: 60%;
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

const ListTeamContent = styled.div``;
const SearchTeam = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 15px;
`;
const SelectTeam = styled.div`
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
      justify-content: space-between;
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
  align-items: center;

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

const ListTeam = () => {
  const dispatch = useDispatch();
  const selectedUsers = useSelector(selectedUserSelector);
  const position = ["Staff", "Internship", "Collaborator"];
  const color = ["#f44336", "#4caf50", "#2196f3"];

  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };

  const [searchText, setSearchText] = useState("");
  const [value] = useDebounce(searchText, 1000);

  const [isInActive, setIsInActive] = useState(false);
  const handleInActive = (event) => {
    setIsInActive(event.target.checked);
  };
  const [isDeActive, setIsDeActive] = useState(false);
  const handleDeActive = (event) => {
    setIsDeActive(event.target.checked);
  };

  const searchedUsers = selectedUsers.filter((user) => {
    if (isDeActive) {
      if (isInActive) {
        return (
          user.role === 3 &&
          user.isActive !== isInActive &&
          user.emailAddress.includes(value)
        );
      }
      return user.role === 3 && user.emailAddress.includes(value);
    } else {
      if (isInActive) {
        return (
          user.isActive !== isInActive && user.emailAddress.includes(value)
        );
      }
      return user.role !== 3 && user.emailAddress.includes(value);
    }
  });

  const handleRemove = (user) => {
    dispatch(removeUser(user));
  };

  const handleChangeType = (event, user) => {
    dispatch(updateType({ ...user, role: event.target.value }));
  };

  return (
    <ListTeamView>
      <Header onClick={handleOpen}>
        <HeaderText>Team</HeaderText>
        {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Header>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListTeamContent>
          <SearchTeam>
            <SelectTeam>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#f24b50",
                  },
                }}
                style={{ paddingLeft: 0 }}
                checked={isDeActive}
                onChange={handleDeActive}
              />
              <strong>Show deactive member</strong>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#f24b50",
                  },
                }}
                style={{ paddingLeft: 0 }}
                checked={isInActive}
                onChange={handleInActive}
              />
              <strong>Show inactive member</strong>
            </SelectTeam>
            <TextField
              label="Search"
              variant="standard"
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
          </SearchTeam>
          <List>
            <table>
              {searchedUsers.map((user, index) => (
                <tr key={index}>
                  <td>
                    <UserInfo>
                      <CloseIcon
                        sx={{ padding: "0 10px" }}
                        onClick={() => {
                          handleRemove(user);
                        }}
                      />
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
                        <p>
                          {user.emailAddress}
                          <strong>
                            {!user.isActive ? "[Inactive]" : null}
                          </strong>
                        </p>
                      </UserName>
                    </UserInfo>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 100 }}
                    >
                      <Select
                        value={user.role}
                        onChange={(event) => {
                          handleChangeType(event, user);
                        }}
                      >
                        <MenuItem value={0}>Member</MenuItem>
                        <MenuItem value={1}>PM</MenuItem>
                        <MenuItem value={2}>Shadow</MenuItem>
                        <MenuItem value={3}>Deactive</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 100 }}
                    >
                      <Select disabled>
                        <strong>Offical</strong>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
              ))}
            </table>
          </List>
        </ListTeamContent>
      </Collapse>
    </ListTeamView>
  );
};

export default ListTeam;
