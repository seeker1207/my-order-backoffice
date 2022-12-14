import {styled, TableCell, TableRow} from "@mui/material";
import {tableCellClasses} from "@mui/material/TableCell";

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
  '&': {
    cursor: 'pointer',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.grey.A700,
  },
  '&:hover td': {
    color: theme.palette.common.white,
  },
  '&:hover th': {
    color: theme.palette.common.white,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export {StyledTableRow, StyledTableCell}