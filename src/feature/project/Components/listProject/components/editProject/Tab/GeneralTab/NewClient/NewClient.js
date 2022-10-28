import { Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCustomer } from "../../../../../../../../../redux/actions/projectAction";

const NewClientView = styled.div`
  display: flex;
  padding: 10px 25px;
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
  font-size: 20px;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 22px;
`;

const NewClient = () => {
  const stopPropagate = (callback) => {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      callback();
    };
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const dispatch = useDispatch();
  const handleCreate = (data) => {
    dispatch(createCustomer(data));
    handleClose();
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <NewClientView>
      <Button
        style={{
          background: "#f24b50",
          height: "35px",
          textTransform: "capitalize",
          boxShadow: "box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New Client
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            height: 300,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            borderRadius: 1,
            padding: "24px",
          }}
        >
          <form onSubmit={stopPropagate(handleSubmit(handleCreate))}>
            <TitleHeader>New Task</TitleHeader>
            <TextField
              error={errors.name}
              label="Name *"
              variant="standard"
              required
              InputLabelProps={{ style: { fontSize: 14 } }}
              style={{ width: "100%", marginBottom: "20px" }}
              size="small"
              {...register("name")}
            />
            <TextField
              error={errors.code}
              label="Code *"
              variant="standard"
              required
              InputLabelProps={{ style: { fontSize: 14 } }}
              style={{ width: "100%", marginBottom: "20px" }}
              size="small"
              {...register("code")}
            />
            <TextField
              label="Address *"
              variant="standard"
              InputLabelProps={{ style: { fontSize: 14 } }}
              style={{ width: "100%", marginBottom: "20px" }}
              size="small"
              {...register("address")}
            />
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
    </NewClientView>
  );
};

export default NewClient;
