import React, { useEffect, useState } from "react";
import CreateProject from "./Components/createProject/createProject";
import SelectProject from "./Components/SelectProject/SelectProject";
import ListProject from "./Components/listProject/ListProject";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../redux/actions/projectAction";
import { resetError, resetSuccess } from "../../redux/reducers/projectReducer";
import { Alert, Snackbar } from "@mui/material";
import styled from "styled-components";
import {
  errorSelector,
  successSelector,
} from "../../redux/selector/selectorProject";

const ProjectContainer = styled.div`
  border: 20px solid #ccc;
  box-sizing: border-box;
  margin: 100px 0 0 300px;
`;

const ProjectHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.35);
  position: relative;
`;

const TitleHeader = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #111;
  font-family: Arial, Helvetica, sans-serif;
`;

const AddContent = styled.div`
  display: flex;
  padding: 0 25px;
  justify-content: space-between;
`;

const Project = () => {
  const error = useSelector(errorSelector);
  const success = useSelector(successSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProject({ status: 0 }));
  }, [dispatch]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  useEffect(() => {
    if (error !== "") {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(resetError());
      }, 3000);
    }
    if (success !== "") {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(resetSuccess());
      }, 3000);
    }
  }, [error, success, dispatch]);

  return (
    <ProjectContainer>
      <ProjectHeader>
        <TitleHeader>Manage Projects</TitleHeader>
      </ProjectHeader>
      <AddContent>
        <CreateProject />
        <SelectProject />
      </AddContent>
      <ListProject />
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
    </ProjectContainer>
  );
};

export default Project;
