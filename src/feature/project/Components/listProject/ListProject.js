import React from "react";
import ActionButton from "./components/actionButton/actionButon";
import styled from "styled-components";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { projectSelector } from "../../../../redux/selector/selectorProject";

const ListProjectView = styled.div`
  padding: 0 25px;

  & table {
    width: 100%;
    color: #555555;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-collapse: collapse;
    margin-top: 15px;
  }

  & th {
    background-color: lightgray;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 700;
    text-align: left;
    padding: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  & td {
    padding: 5px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }

  & tr {
    background-color: white;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    &:hover {
      background: #f1f1f1;
    }
  }
`;

const ClientName = styled.div`
  background-color: lightgray;
  padding-left: 10px;
  border-radius: 5px;
  height: 5rem;
`;
const ProjectInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`;

const StyleSpan = styled.span`
  font-weight: 600;
  color: #fff;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 10px;
  background: ${(props) => props.color};
`;

const RightView = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const groupBy = function (arr, key) {
  return arr.reduce(function (newArr, item) {
    (newArr[item[key]] = newArr[item[key]] || []).push(item);
    return newArr;
  }, {});
};

const formatDay = (day) => dayjs(day).format("DD/MM/YYYY");

const ListProject = () => {
  const data = useSelector(projectSelector);
  const projects = groupBy(data, "customerName");
  const listProjectType = ["T&M", "FF", "NB", "ODC"];
  return (
    <ListProjectView>
      {Object.keys(projects).map((key, index) => (
        <table key={index}>
          <thead>
            <tr>
              <th>{key}</th>
            </tr>
          </thead>
          <tbody>
            {projects[key].map((project, index) => (
              <tr key={project.index}>
                <td>
                  <ProjectInfo>
                    {project.name}
                    <StyleSpan color="#2e95ea">
                      {project.pms.join(", ")}
                    </StyleSpan>
                    <StyleSpan color="#f44336">{`${project.activeMember} members`}</StyleSpan>
                    {listProjectType[project.projectType] ? (
                      <StyleSpan color="#f89c26">
                        {listProjectType[project.projectType]}
                      </StyleSpan>
                    ) : null}

                    <StyleSpan color="#4caf50">
                      {`${formatDay(project.timeStart)} ${
                        project.timeEnd
                          ? ` - ${formatDay(project.timeEnd)}`
                          : ""
                      }`}{" "}
                    </StyleSpan>
                  </ProjectInfo>
                  <RightView>
                    <ActionButton project={project} />
                  </RightView>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </ListProjectView>
  );
};

export default ListProject;
