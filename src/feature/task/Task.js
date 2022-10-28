import React from "react";
import { MoreVert } from "@mui/icons-material";
import styled from "styled-components";
import CommonTask from "./component/commontask/CommonTask";
import CreateTask from "./component/CreateTask/CreateTask";
import SearchTask from "./component/SearchTask/SearchTask";
import { useState } from "react";
import { useEffect } from "react";
import { resetError, resetSuccess } from "../../redux/reducers/authReducer";
import { getTask } from "../../redux/actions/taskAction";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import OtherTask from "./component/OtherTack/OtherTack";
import {
  errorSelector,
  successSelector,
} from "../../redux/selector/selectorTask";

const TaskContainer = styled.div`
  border: 20px solid #ccc;
  box-sizing: border-box;

  margin: 100px 0 0 300px;
`;

const TaskContent = styled.div`
  padding: 10px 10px 10px 10px;
`;
const HeaderTask = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const TitleHeader = styled.div`
  font-size: 22px;
`;
const AddContent = styled.div`
  display: flex;
`;

const Task = () => {
  const error = useSelector(errorSelector);
  const success = useSelector(successSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);

  const [searchText, setSearchText] = useState();
  const handleSearch = (data) => {
    setSearchText(data);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  useEffect(() => {
    if (error !== "") {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(resetError());
      }, 2500);
    }
    if (success !== "") {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(resetSuccess());
      }, 2500);
    }
  }, [error, success, dispatch]);

  return (
    <TaskContainer>
      <TaskContent>
        <HeaderTask>
          <TitleHeader>Manage Tasks</TitleHeader>
          <MoreVert />
        </HeaderTask>
        <hr />
        <AddContent>
          <CreateTask setRefreshUi />
          <SearchTask setSerch={handleSearch} />
        </AddContent>
        <CommonTask searchText={searchText} />
        <OtherTask searchText={searchText} />
        <Snackbar
          open={openSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => setOpenSnackbar(false)}
          autoHideDuration={2000}
        >
          <Alert variant="filled" severity={error ? "error" : "success"}>
            {error ? error : success}
          </Alert>
        </Snackbar>
      </TaskContent>
    </TaskContainer>
  );
};

export default Task;
