import AddIcon from "@mui/icons-material/Add";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Modal, Tab } from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  createProject,
  getCustomer,
  getUserNotPagging,
} from "../../../../redux/actions/projectAction";
import { getTask } from "../../../../redux/actions/taskAction";
import {
  taskSelector,
  userSelector,
} from "../../../../redux/selector/selectorProject";

import GeneralTab from "./tabCreateProject/generalTab/generalTab";
import NotificationTab from "./tabCreateProject/notificationTab/notificationTab";
import TasksTab from "./tabCreateProject/tasks/task";
import TeamTab from "./tabCreateProject/teams/team";

const CreateProjectContent = styled.div`
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

const Hr = styled.hr`
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

const CreateForm = styled.form``;

const CreateProject = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    dispatch(getCustomer());
    dispatch(getUserNotPagging());
    dispatch(getTask());
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const tasks = useSelector(taskSelector);
  const users = useSelector(userSelector);

  const handleCreate = (data) => {
    dispatch(
      createProject({
        ...data,
        tasks: tasks,
        users: users,
      })
    );
    handleClose();
  };

  return (
    <CreateProjectContent>
      <Button
        style={{
          background: "#f24b50",
          width: "100%",
          height: "50px",
          marginTop: "15px",
          marginBottom: "20px",
        }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New Project
      </Button>
      <Modal open={open}>
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
            <CreateForm onSubmit={handleSubmit(handleCreate)}>
              <TitleHeader>Create Project</TitleHeader>
              <Hr />
              {/* {console.log(value)} */}
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
                    color: "black",
                    background: "#fff",
                    border: "none",

                    fontSize: 13,
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ background: "red" }}
                >
                  Save
                </Button>
              </ButtonContainer>
            </CreateForm>
          </FormProvider>
        </Box>
      </Modal>
    </CreateProjectContent>
  );
};

export default CreateProject;
