import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SearchTask = ({ setSerch }) => {
  const [text, setText] = useState("");

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      setSerch(text);
    }
  };

  const onChange = (event) => {
    setText(event.currentTarget.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginLeft: "200px" }}>
      <TextField
        sx={{ width: "500px" }}
        id="input-with-sx"
        label="Search by task name"
        variant="outlined"
        required
        value={text}
        onChange={onChange}
        onKeyUp={onKeyUp}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
    </Box>
  );
};

export default SearchTask;
