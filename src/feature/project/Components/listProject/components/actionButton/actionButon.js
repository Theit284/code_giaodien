import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { styled, alpha } from "@mui/material/styles";
import DeleteModal from "../ProjectModal/DeleteModal";
import ActiveModal from "../ProjectModal/ActiveModal";
import EditProject from "../editProject/EditProject";
import { useDispatch } from "react-redux";
import { resetInfo } from "../../../../../../redux/reducers/projectReducer";

const StyleMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 5,
    minWidth: 80,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 20,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ActionButton = (props) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  const [isActive, setIsActive] = useState(false);
  const handleActive = () => {
    setIsActive(!isActive);
    handleClose();
  };

  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = () => {
    setIsDelete(!isDelete);
    handleClose();
  };
  // const [isView, setIsView] = useState(false);
  const handleView = () => {
    // setIsDelete(!isDelete);
    // handleClose();
  };

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(!isEdit);
    handleClose();
    dispatch(resetInfo());
  };
  return (
    <div style={{ float: "right" }}>
      <ActiveModal
        open={isActive}
        handleClose={handleActive}
        project={props.project}
      />
      <DeleteModal
        open={isDelete}
        handleClose={handleDelete}
        project={props.project}
      />
      <EditProject
        open={isEdit}
        handleClose={handleEdit}
        project={props.project}
      />
      <Button
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          backgroundColor: "#fff",
          color: "rgba(0, 0, 0, 0.87)",
          fontSize: "14px",
          textTransform: "capitalize",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
          "&:hover": {
            backgroundColor: "#fff",
            color: "rgba(0, 0, 0, 0.87)",
          },
        }}
      >
        Action
      </Button>
      <StyleMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleView} disableRipple>
          <RemoveRedEyeIcon />
          View
        </MenuItem>
        <MenuItem onClick={handleActive} disableRipple>
          <CloseIcon />
          {props.project.status === 0 ? "Deactive" : "Active"}
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyleMenu>
    </div>
  );
};

export default ActionButton;
