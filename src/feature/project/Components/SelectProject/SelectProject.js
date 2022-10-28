import React, { useState } from "react";
import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { getProject } from "../../../../redux/actions/projectAction";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const SelectProjectView = styled.div`
  display: flex;
  padding: 0 25px;
  gap: 100px;
  align-items: center;
`;

const SearchProjectView = styled.div``;
const StatusProjectView = styled.div``;

const SelectProject = () => {
  const [status, setStatus] = useState(0);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    dispatch(
      getProject({
        status: event.target.value !== 2 ? event.target.value : "",
        search: searchText,
      })
    );
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      dispatch(
        getProject({
          status: status !== 2 ? status : "",
          search: searchText,
        })
      );
    }
  };

  const handleChangeSearch = (event) => {
    setSearchText(event.currentTarget.value);
  };

  return (
    <SelectProjectView>
      <StatusProjectView>
        <Select
          sx={{ width: "200px", height: "50px" }}
          value={status}
          onChange={handleChangeStatus}
        >
          <MenuItem value={0}>Active Projects</MenuItem>
          <MenuItem value={1}>Deactive Projects</MenuItem>
          <MenuItem value={2}>All Projects</MenuItem>
        </Select>
      </StatusProjectView>

      <SearchProjectView>
        <TextField
          id="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{
            width: "600px",
            color: "rgb(85, 85, 85)",
            marginTop: "15px",
          }}
          label="Search by Project name"
          value={searchText}
          variant="outlined"
          onChange={handleChangeSearch}
          onKeyUp={onKeyUp}
        />
      </SearchProjectView>
    </SelectProjectView>
  );
};

export default SelectProject;
