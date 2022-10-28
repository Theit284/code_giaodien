import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTask } from "../../../../redux/actions/taskAction";

const EditTaskContainer = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 55px;
`;

const TitleHeader = styled.div`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 22px;
`;

const EditTask = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { handleSubmit, register } = useForm();

  const dispatch = useDispatch();
  const handleEdit = (data) => {
    dispatch(createTask({ ...data, id: props.task.id }));
    handleClose();
  };
  return (
    <EditTaskContainer>
      <Button
        variant="contained"
        style={{ background: "#1f91f3", textTransform: "none" }}
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 260,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            borderRadius: 1,
            padding: "24px",
          }}
        >
          <form onSubmit={handleSubmit(handleEdit)}>
            <TitleHeader>EditTask: {props.task && props.task.name}</TitleHeader>
            <TextField
              label="Name *"
              variant="standard"
              required
              InputLabelProps={{ style: { fontSize: 14 } }}
              style={{ width: "100%", marginBottom: "20px" }}
              size="small"
              defaultValue={props.task && props.task.name}
              {...register("name")}
            />
            <TextField
              select
              label="Select Task"
              variant="standard"
              required
              style={{ width: "100%", fontSize: "14px" }}
              defaultValue={props.task && props.task.type}
              {...register("type")}
            >
              <MenuItem value={0}>Common Task</MenuItem>
              <MenuItem value={1}>Other Task</MenuItem>
            </TextField>
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
                onClick={handleClose}
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
          </form>
        </Box>
      </Modal>
    </EditTaskContainer>
  );
};

export default EditTask;
