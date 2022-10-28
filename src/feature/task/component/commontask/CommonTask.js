import * as React from "react";
import "./CommonTask.scss";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditTask from "../EditTask/EditTask";
import Delete from "../Delete/Delete";
import Archive from "../archiveTask/archive";
import UnArchive from "../unArchiveTask/unArchiveTask";
import { useSelector } from "react-redux";
import { commonTaskSelector } from "../../../../redux/selector/selectorTask";

// const data = [
//   { id: 1, title: "html" },
//   { id: 2, title: "css" },
//   { id: 3, title: "Javascrip" },
//   { id: 4, title: "React" },
// ];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//

const CommonTask = (props) => {
  const commonTasks = useSelector(commonTaskSelector);
  const searchItem = commonTasks.filter((item) =>
    item.name.toLowerCase().includes(props.searchText || "")
  );

  return (
    <div className="contener" style={{ width: "100%" }}>
      <div className="title">
        <div className="title1">Common Task ({searchItem.length})</div>
        <div className="title2">
          These tasks are automatically added to all new projects
        </div>
        <hr style={{ color: "rgb(247, 40, 40)" }} />
        <h2>Name</h2>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableBody>
            {searchItem.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell
                  style={{ width: "420px", textAlign: "center" }}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ float: "right" }}>
                  <div className="row-item">
                    <div className="itemRight">
                      <EditTask task={row} />
                    </div>
                    <div className="itemRight">
                      {!row.isDeleted ? (
                        <Archive task={row} />
                      ) : (
                        <UnArchive task={row} />
                      )}
                    </div>
                    <div className="itemRight">
                      {!row.isDeleted ? (
                        <Delete disabled={true} task={row} />
                      ) : (
                        <Delete disabled={false} task={row} />
                      )}
                    </div>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Dialog /> */}
    </div>
  );
};

export default CommonTask;
