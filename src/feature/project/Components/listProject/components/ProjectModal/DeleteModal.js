import { Box, Button, Modal } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import styled from "styled-components";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../../../../redux/actions/projectAction";

const Title = styled.div`
  font-size: 27px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  padding-top: 17px;
  margin-bottom: 15px;
`;

const TaskName = styled.div`
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 20px;
  color: rgba(0, 0, 0, 0.64);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalView = styled.div``;
const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const handleSubmit = (id) => {
    dispatch(deleteProject(id));
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
          <TaskName>Delete {props.project.name}</TaskName>
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
                handleSubmit(props.project.id);
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

export default DeleteModal;
