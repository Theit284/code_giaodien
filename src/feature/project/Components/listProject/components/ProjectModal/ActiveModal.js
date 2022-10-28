import { Box, Button, Modal } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import React from "react";
import { ButtonContainer, ModalView, TaskName, Title } from "./ProjectModalCSS";
import { useDispatch } from "react-redux";
import {
  activeProject,
  inactiveProject,
} from "../../../../../../redux/actions/projectAction";

const ActiveModal = (props) => {
  const dispatch = useDispatch();
  const handleSubmit = (project) => {
    if (project.status === 0) {
      dispatch(inactiveProject({ id: project.id }));
    } else {
      dispatch(activeProject({ id: project.id }));
    }
    props.handleClose();
  };

  return (
    <ModalView>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 1,
            padding: "24px",
          }}
        >
          <ErrorOutlineIcon
            sx={{
              width: "100px",
              height: "100px",
              color: "#f8bb86",
            }}
          />
          <Title>Are you sure?</Title>
          <TaskName>
            {props.project.status === 0
              ? `Deactive ${props.project.name}`
              : `Active ${props.project.name}`}
          </TaskName>
          <ButtonContainer>
            <Button
              variant="outlined"
              sx={{
                color: "#555",
                fontWeight: 600,
                backgroundColor: "rgb(239, 239, 239)",
                border: "none",
                outline: "none",
                textTransform: "capitalize",
                ":hover": {
                  backgroundColor: "rgb(239, 239, 239)",
                  border: "none",
                },
              }}
              onClick={props.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                background: "#7cd1f9",
                border: "none",
                outline: "none",
                textTransform: "capitalize",
                ":hover": {
                  background: "#7cd1f9",
                  border: "none",
                },
              }}
              onClick={() => {
                handleSubmit(props.project);
              }}
            >
              Yes
            </Button>
          </ButtonContainer>
        </Box>
      </Modal>
    </ModalView>
  );
};

export default ActiveModal;
