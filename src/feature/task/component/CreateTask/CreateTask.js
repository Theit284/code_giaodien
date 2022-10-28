import * as React from "react";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTask } from "../../../../redux/actions/taskAction";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CreateTask({ setRefreshUi }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const dispatch = useDispatch();

  const handleCreate = (data) => {
    dispatch(createTask(data));
    handleClose();
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <Button
        style={{ background: "#f24b50", height: "40px" }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        New Task
      </Button>
      <div className="form" style={{ width: "" }}>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            New Task
          </BootstrapDialogTitle>
          <form onSubmit={handleSubmit(handleCreate)} style={{ width: "" }}>
            <DialogContent sx={{ width: "300px" }} dividers>
              <Typography gutterBottom>
                <TextField
                  label="Name *"
                  variant="standard"
                  required
                  style={{ width: "100%" }}
                  {...register("name")}
                />
              </Typography>
              <Typography gutterBottom>
                <TextField
                  select
                  label="Select Task"
                  variant="standard"
                  required
                  style={{ width: "100%", fontSize: "14px" }}
                  {...register("type")}
                >
                  <MenuItem value={0}>Common Task</MenuItem>
                  <MenuItem value={1}>Other Task</MenuItem>
                </TextField>
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button type="submit" autoFocus>
                Save changes
              </Button>
            </DialogActions>
          </form>
        </BootstrapDialog>
      </div>
    </div>
  );
}
