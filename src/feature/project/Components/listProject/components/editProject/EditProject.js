import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Modal, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  getCustomer,
  getSingleProject,
  getUserNotPagging,
} from "../../../../../../redux/actions/projectAction";
import { getTask } from "../../../../../../redux/actions/taskAction";
import { addData } from "../../../../../../redux/reducers/projectReducer";

import GeneralTab from "./Tab/GeneralTab/GeneralTab";
import NotificationTab from "./Tab/NotificationTab/NotificationTab";
import TasksTab from "./Tab/TasksTab/TasksTab";
import TeamTab from "./Tab/TeamTab/TeamTab";
import styled from "styled-components";
import {
  taskSelector,
  userSelector,
} from "../../../../../../redux/selector/selectorProject";

const EditProjectView = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  position: fixed;
  bottom: 12px;
  right: 24px;
`;

const TitleHeader = styled.div`
  font-size: 30px;
  font-weight: bold;
  line-height: 48px;
  z-index: 1;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 10px;
  margin-top: 20px;
`;

const Break = styled.hr`
  height: 0;
  box-sizing: content-box;
  margin-top: 20px;
  border: 0;
  border-top: 1px solid #eee;
`;

const ListTab = styled.div`
  overflow-y: auto;
  width: 100%;
  max-height: 68vh;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const TabLabel = styled.span`
  width: 112px;
  text-transform: none;
  font-size: 14px;
  font-weight: 500;
`;

const EditForm = styled.form``;

const EditProject = (props) => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const methods = useForm();
  const { handleSubmit } = methods;

  const dispatch = useDispatch();
  const users = useSelector(userSelector);
  const tasks = useSelector(taskSelector);
  const handleEdit = (data) => {
    dispatch(
      createProject({
        ...data,
        id: props.project.id,
        users: users,
        tasks: tasks,
      })
    );
    props.handleClose();
  };

  useEffect(() => {
    if (props.open) {
      Promise.all([
        dispatch(getCustomer()),
        dispatch(getTask()),
        dispatch(getUserNotPagging()),
        dispatch(getSingleProject(props.project.id)),
      ]).then(() => {
        dispatch(addData());
      });
    }
  }, [props.open, dispatch]);
  return (
    <EditProjectView>
      <Modal open={props.open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "78%",
            height: "85%",
            bgcolor: "#fff",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            borderRadius: "4px",
          }}
        >
          <FormProvider {...methods}>
            <EditForm onSubmit={handleSubmit(handleEdit)}>
              <TitleHeader>{`EditProject: ${props.project.name}`}</TitleHeader>
              <Break />
              <Box sx={{ width: "100%", zIndex: 0 }}>
                <ListTab>
                  <TabContext value={value}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                      }}
                      style={{ fontSize: "14px", fontWeight: "500" }}
                    >
                      <TabList onChange={handleChange}>
                        <Tab label={<TabLabel>General</TabLabel>} value="1" />
                        <Tab label={<TabLabel>Team</TabLabel>} value="2" />
                        <Tab label={<TabLabel>Tasks</TabLabel>} value="3" />
                        <Tab
                          label={<TabLabel>Notification</TabLabel>}
                          value="4"
                        />
                      </TabList>
                    </Box>
                    <TabPanel sx={{ p: 0 }} value="1">
                      <GeneralTab />
                    </TabPanel>
                    <TabPanel sx={{ p: 0 }} value="2">
                      <TeamTab />
                    </TabPanel>
                    <TabPanel sx={{ p: 0 }} value="3">
                      <TasksTab />
                    </TabPanel>
                    <TabPanel sx={{ p: 0 }} value="4">
                      <NotificationTab />
                    </TabPanel>
                  </TabContext>
                </ListTab>
              </Box>
              <ButtonContainer>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    color: "rgb(51, 51, 51)",
                    background: "#fff",
                    border: "none",
                    textTransform: "capitalize",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    fontSize: 13,
                  }}
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{
                    background: "#f24b50",
                    color: "rgba(0, 0, 0, 0.26)",
                    textTransform: "capitalize",
                    fontSize: 13,
                  }}
                >
                  Save
                </Button>
              </ButtonContainer>
            </EditForm>
          </FormProvider>
        </Box>
      </Modal>
    </EditProjectView>
  );
};

export default EditProject;
