import React from 'react';
import {styled} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import {
  Box, Paper, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography,TableContainer
} from '@mui/material';



function OrderListPage() {
  function createData(
    name: number,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return {
      name, calories, fat, carbs, protein,
    };
  }

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const rows = [
    createData(1, 159, 6.0, 24, 4.0),
    createData(2, 237, 9.0, 37, 4.3),
    createData(3, 262, 16.0, 24, 6.0),
    createData(4, 305, 3.7, 67, 4.3),
    createData(5, 356, 16.0, 49, 3.9),
  ];
  return (
    <>


    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Typography variant="h5" sx={{textAlign: "left", marginTOp: "1em"}}> 주문 현황 </Typography>
        </Grid>
        <Grid item xs={3} />

        <Grid item xs={3} />
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>고객 아이디</StyledTableCell>
                  <StyledTableCell align="right">주소</StyledTableCell>
                  <StyledTableCell align="right">상세 주소</StyledTableCell>
                  <StyledTableCell align="right">총 주문 금액</StyledTableCell>
                  <StyledTableCell align="right">주문 일시</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell  component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </Box>
    </>
  );
}

export default OrderListPage;
