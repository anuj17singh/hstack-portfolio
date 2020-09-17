import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
  
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, isin, investment, currentValuation, unrealized, realized) {
  return {name, isin, investment, currentValuation, unrealized, realized};
}

const rows = [
  createData('Reliance', 12345, '$2032210', '$22330.2', '10000(61%)', '$10000.00'),
  createData('Reliance', 12345, '$200', '$20', '61%', '$10'),
  createData('Reliance', 12345, '$200', '$20', '61%', '$10'),
  createData('Reliance', 12345, '$200', '$20', '61%', '$10'),
  createData('Reliance', 12345, '$200', '$20', '61%', '$10'),
  createData('Reliance', 12345, '$200', '$20', '61%', '$10'),
  createData('Reliance', 12345, '$200', '$20', '61%', '$10'),
]
// .sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
    border: 1
  },
});

export default function CustomPaginationActionsTable(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const detailTableData = props.detailsData;
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead style={{backgroundColor:'rgba(127,127,127,0.11)'}}>
          <TableRow>
            <TableCell>Equity name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Investment</TableCell>
            <TableCell align="right">Current&nbsp;Valuation</TableCell>
            <TableCell align="right">Unrealized&nbsp;Profit/Loss</TableCell>
            <TableCell align="right">Unrealized&nbsp;Profit/Loss(%)</TableCell>
          </TableRow>
        </TableHead>  
        <TableBody >
          {(rowsPerPage > 0
            ? detailTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : detailTableData
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.quantity}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
               $ {parseFloat(row.investment).toFixed(2)}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              $ {parseFloat(row.currentValuation).toFixed(2)}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              $ {parseFloat(row.unrealizedPL).toFixed(2)}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {parseFloat(row.unrealizedPLPercentage).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={detailTableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}