import {
  Checkbox,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import NewClient from "./newClient/newClient";
import { useFormContext } from "react-hook-form";

import { useSelector } from "react-redux";
import { customerSelector } from "../../../../../../redux/selector/selectorProject";

const GeneralTabView = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  width: 16.66666667%;
  font-size: 14px;
  font-weight: 600;
`;

const FormInput = styled.div`
  display: flex;
  align-items: flex-start;
  align-items: center;
  margin-top: 30px;
  &:hover {
    border-color: #333;
  }
`;
const ProjectTypeLabel = styled.span`
  width: 100px;
  text-transform: none;
  font-size: 14px;
  font-weight: 500;
`;

const ProjectTypeGroup = styled(ToggleButtonGroup)`
  display: flex;
  justify-content: space-between;
`;

const GeneralTab = () => {
  const customers = useSelector(customerSelector);

  const [projectType, setProjectType] = useState(0);

  const tags = [
    "T&M",
    "Fixed Frice",
    "Non-Bill",
    "ODC",
    "Product",
    "TRAINING",
    "NoSaLary",
  ];

  const handleChange = (event, newProjectType) => {
    setProjectType(newProjectType);
    setValue("projectType", newProjectType);
  };

  const { register, setValue } = useFormContext();
  return (
    <GeneralTabView>
      <FormInput>
        <Label>Client:</Label>
        <Select
          sx={{ height: "50px", width: "50%" }}
          placeholder="Chose a client..."
          required
          MenuProps={{
            PaperProps: { sx: { maxHeight: 200 } },
          }}
          {...register("customerId")}
        >
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>

        <NewClient />
      </FormInput>
      <FormInput>
        <Label>Project Name:</Label>
        <TextField
          sx={{ height: "50px", width: "50%" }}
          placeholder="Enter name"
          required
          {...register("name")}
        />
      </FormInput>
      <FormInput>
        <Label>Project Code:</Label>
        <TextField
          sx={{ height: "50px", width: "50%" }}
          placeholder="Enter code"
          required
          {...register("code")}
        />
      </FormInput>
      <FormInput>
        <Label>Date:</Label>
        <TextField
          type="date"
          sx={{ height: "50px", width: "20%" }}
          placeholder="Start at"
          required
          {...register("timeStart")}
        />
        <div style={{ padding: "15px 5px" }}>To</div>
        <TextField
          type="date"
          sx={{ height: "50px", width: "20%" }}
          placeholder="End at"
          {...register("timeEnd")}
        />
      </FormInput>
      <FormInput>
        <Label>Note:</Label>
        <TextareaAutosize
          {...register("note")}
          style={{
            width: "80%",
            minHeight: "33.5px",
            padding: "16.5px 14px 0 14px",
            fontSize: "16px",
          }}
        />
      </FormInput>
      <FormInput>
        <Label>AllUser</Label>
        <Checkbox
          sx={{
            "&.Mui-checked": {
              color: "#f24b50",
            },
          }}
          id="text"
          style={{ paddingLeft: 0 }}
          {...register("isAllUserBelongTo")}
        />
        <label style={{ fontWeight: "700", cursor: "pointer" }} for="text">
          Auto add user as a member of this project when creating new user
        </label>
      </FormInput>
      <FormInput>
        <Label>Project Type: </Label>
        <ToggleButtonGroup
          value={projectType}
          exclusive
          onChange={handleChange}

          // onClick={(e) => e.target.value}
        >
          <ToggleButton
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                background: "#f36c00",
                color: "#fff",
              },
            }}
            value={0}
          >
            <ProjectTypeLabel> T&M</ProjectTypeLabel>
          </ToggleButton>
          <ToggleButton
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                background: "#f36c00",
                color: "#fff",
              },
            }}
            value={1}
          >
            <ProjectTypeLabel>Fixed Frice</ProjectTypeLabel>
          </ToggleButton>
          <ToggleButton
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                background: "#f36c00",
                color: "#fff",
              },
            }}
            value={2}
          >
            <ProjectTypeLabel>Non-Bill</ProjectTypeLabel>
          </ToggleButton>
          <ToggleButton
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                background: "#f36c00",
                color: "#fff",
              },
            }}
            value={3}
          >
            <ProjectTypeLabel>ODC</ProjectTypeLabel>
          </ToggleButton>
          <ToggleButton
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                background: "#f36c00",
                color: "#fff",
              },
            }}
            value={4}
          >
            <ProjectTypeLabel>Product</ProjectTypeLabel>
          </ToggleButton>
          <ToggleButton
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                background: "#f36c00",
                color: "#fff",
              },
            }}
            value={5}
          >
            Training
          </ToggleButton>
          <ToggleButton
            sx={{
              "&.Mui-selected, &.Mui-selected:hover": {
                background: "#f36c00",
                color: "#fff",
              },
            }}
            value={6}
          >
            <ProjectTypeLabel>NoSalary</ProjectTypeLabel>
          </ToggleButton>

          {/* <div>
            {tags.map((tag, index) => (
              <ToggleButton
                xs={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    background: "#f36c00",
                    color: "#fff",
                  },
                }}
                value={index}
              >
                <ProjectTypeLabel key={index}>{tag}</ProjectTypeLabel>
              </ToggleButton>
            ))}
          </div> */}
        </ToggleButtonGroup>
      </FormInput>
    </GeneralTabView>
  );
};

export default GeneralTab;
