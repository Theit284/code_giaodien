import { Preview } from "@mui/icons-material";
import { Checkbox, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import styled from "styled-components";

const NotificationTabView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SelectView = styled.div``;

const NotificationTab = () => {
  const listNottab = [
    "Submit timesheet",
    "Request Off/Remote/Onsite/Đi muộn, về sớm",
    "Approve/Reject Request Off/Remote/Onsite/Đi muộn, về sớm",
    "Request Change Working Time",
    "Approve/Reject Change Working Time",
  ];

  return (
    <NotificationTabView>
      <TextField
        fullWidth
        variant="standard"
        value={listNottab}
        label={"Komu Channel Id"}
      />
      <SelectView style={{ marginTop: "15px" }}>
        {listNottab.map((notTab, index) => {
          return (
            <div
              key={index}
              style={{ color: "#f24b50", padding: "5px", cursor: "pointer" }}
            >
              <input type={"checkbox"} style={{ color: "#f24b50" }} />
              {notTab}
            </div>
          );
        })}
      </SelectView>
    </NotificationTabView>
  );
};

export default NotificationTab;
