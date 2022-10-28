import * as React from "react";
import styled from "styled-components";
import Deleteimg from "../../../../asset/images/Deleteimg.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../../redux/actions/taskAction";

export default function DeleteTask(props) {
  // const [data, setData] = React.useState([]);
  // console.log("data", data);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    handleClose();
  };

  //

  const Title = styled.div``;
  return (
    <div>
      {props.disabled ? (
        <Button
          style={{ background: "#fb483a", color: "#5a5858" }}
          variant="outlined"
          disabled
          onClick={handleClickOpen}
        >
          Delete
        </Button>
      ) : (
        <Button
          style={{ background: "red", color: "#fff" }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          Delete
        </Button>
      )}
      {/* <Button
        style={{ background: "#fb483a", color: "#fff" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Delete
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img
            alt=""
            style={{ height: "200px", marginLeft: "60px" }}
            src={`${Deleteimg}`}
          />
        </DialogTitle>

        <DialogContent sx={{ width: "400px", textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            <b style={{ fontSize: "30px" }}>Are you sure?</b>
            <Title>Delete project: "{props.task.name}"?</Title>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            style={{ backgroundColor: "#7cd1f9", color: "#fff" }}
            onClick={() => handleDelete(props.task.id)}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
