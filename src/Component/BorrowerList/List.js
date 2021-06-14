import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Api from "../../Services/Api"


const useStyles = makeStyles({
  root: {
    width: "100%",
    boxShadow: "0px 4px 12px rgba(35, 209, 35, 0.31)",
    borderRadius: "20px",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    {
      id: "sn",
      label: "S/N",
      minWidth: 10,
    },
    {
      id: "name",
      label: "Name",
      minWidth: 180,
      //    align: 'right',
    },
    {
      id: "email",
      label: "Email",
      minWidth: 100,
      // align: 'right',
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 120,
      // align: 'right',
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "date",
      label: "Date",
      minWidth: 100,
      // align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: "time",
      label: "Time",
      minWidth: 150,
      // align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: "status",
      label: "Status",
      minWidth: 150,
      // align: 'right',
      format: (value) => value.toFixed(2),
    },
   
  ];
  
  function createData(
    sn,
    name,
    email,
    amount,
    date,
    time,
    status
  ) {
    //   const density = population / size;
    return { sn, name, email, amount, date, time, status};
  }
  
  const rows = [
    createData(
      "2020-10-22",
      "Personal Loan",
      "Rent",
      "5%",
      "6 months",
      "NGN 50,000.00",
       "Paid"
    ),
    createData(
      "2020-10-22",
      "Personal Loan",
      "Rent",
      "5%",
      "6 months",
      "NGN 50,000.00",
       "Paid"
    ),  
  ];
  const [borrowerList, setBorrowerList] = useState([])

  const getBorrowerList = ()=>{
    Api().get('/loans')
    .then(function (response) {
      // handle success
      console.log(response.data.data);
      setBorrowerList(response.data.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  
  }
  useEffect(() => {
    getBorrowerList()
  
  }, [])
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
