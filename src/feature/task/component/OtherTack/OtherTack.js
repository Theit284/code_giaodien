import * as React from "react";
// import "./CommonTask.scss";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditTask from "../EditTask/EditTask";
import DeleteTask from "../Delete/Delete";
import { useSelector } from "react-redux";
import { otherTaskSelector } from "../../../../redux/selector/selectorTask";

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

const OtherTask = (props) => {
  const otherTasks = useSelector(otherTaskSelector);

  const searchItem = otherTasks.filter((item) =>
    item.name.toLowerCase().includes(props.searchText || "")
  );
  //   getLists();
  // }, []);

  // if (!list) return null;
  // const handleDelete = (id) => {
  //   axios.delete(`http://localhost:3000/data2/${id}`).then((res) => {
  //     console.log(res);
  //     console.log(res.data);

  //     setList(list.filter((item) => item.id !== id));
  //   });
  // };

  return (
    <div className="contener" style={{ width: "100%" }}>
      <div className="title">
        <div className="title1">Other Task ({searchItem.length})</div>
        <div className="title2">
          These task must be manually added to projects
        </div>
        <hr />
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
                      <DeleteTask task={row} />
                    </div>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OtherTask;
