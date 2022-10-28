import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import React, { memo, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  pushTask,
  removeTask,
  updateBillable,
} from "../../../../../../redux/reducers/projectReducer";
import {
  selectedTaskSelector,
  unSelectedTaskSelector,
} from "../../../../../../redux/selector/selectorProject";

const TasksTabView = styled.div``;

const ListTask = styled.div`
  & table {
    width: 100%;
    color: #555555;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-collapse: collapse;

    & th {
      background: white;
      font-size: 14px;
      text-align: left;
      padding: 10px;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
    & td {
      margin: 10px;
      padding: 10px;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    & tr {
      background-color: #f6f6f6;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      &:nth-child(even) {
        background: white;
      }
      &:hover {
        background: #f1f1f1;
      }
    }
  }
`;

const Task = () => {
  const selectedTask = useSelector(selectedTaskSelector);
  const unSelectedTask = useSelector(unSelectedTaskSelector);

  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (task) => {
    dispatch(updateBillable(task));
  };

  const dispatch = useDispatch();
  const handlePush = (task) => {
    dispatch(pushTask(task));
  };
  const handleRemove = (task) => {
    dispatch(removeTask(task));
  };

  return (
    <TasksTabView>
      <ListTask>
        <table>
          <thead>
            <tr>
              <th>Tasks</th>
              <th>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#f24b50",
                        },
                      }}
                      style={{ padding: 0 }}
                    />
                  }
                  label="Billable"
                  labelPlacement="top"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedTask.map((task, index) => (
              <tr key={index}>
                <td>
                  <IconButton onClick={() => handleRemove(task)}>
                    <CloseIcon />
                  </IconButton>
                  {task.name}
                </td>
                <td>
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#f24b50",
                      },
                    }}
                    style={{ padding: 0, marginLeft: 30 }}
                    checked={task.billable}
                    onChange={() => handleChange(task)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ListTask>
      <ListTask>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
            padding: "10px",
          }}
          onClick={handleClick}
        >
          Select {open ? <ExpandLess /> : <ExpandMore />}
        </Box>
        {open ? (
          <table>
            {unSelectedTask.map((item) => (
              <tr key={item.id}>
                <td>
                  <IconButton onClick={() => handlePush(item)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  {item.name}
                </td>
                <td>{item.type === 0 ? "Common Task" : "Other Task"}</td>
              </tr>
            ))}
          </table>
        ) : null}
      </ListTask>
    </TasksTabView>
  );
};

export default memo(Task);
