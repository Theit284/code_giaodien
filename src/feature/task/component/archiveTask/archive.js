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
import { archiveTask } from "../../../../redux/actions/taskAction";

export default function Archive(props) {
  // const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleArchive = (id) => {
    dispatch(archiveTask(id));
    handleClose();
  };

  //

  const Title = styled.div``;
  return (
    <div>
      <Button
        style={{ background: "white", color: "black" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Archive
      </Button>

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
            <Title>Archive task: "{props.task.name}"?</Title>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            style={{ backgroundColor: "#7cd1f9", color: "#fff" }}
            onClick={() => handleArchive(props.task.id)}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
