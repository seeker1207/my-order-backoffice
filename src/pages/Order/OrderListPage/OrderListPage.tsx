import React, {useEffect, useRef, useState} from 'react';
import {Button, Pagination, styled} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { paginationClasses } from "@mui/material";
import {
  Box, Paper, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography,TableContainer
} from '@mui/material';
import useSWR from 'swr';
import {orderApi} from "../../../api";
import {Order} from "../../../model/modelType";
import OrderFormModal from "../../../components/Modal/OrderFormModal";
import DefaultButton from "../../../components/Button/defaultButton";

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

const StyledPagination = styled(Pagination)`
  .${paginationClasses.ul} {
    justify-content: center;
  }
`

const COUNT_PER_PAGE = 20;

function getTotalCount(length: number){
  const tempTotalCount = length / COUNT_PER_PAGE;
    return tempTotalCount === Math.floor(tempTotalCount) ? tempTotalCount: Math.floor(tempTotalCount) + 1;
}

function OrderListPage() {
  const { data: orders, error } = useSWR<Order[], Error>('orders', orderApi.getOrderList)
  const [page, setPage] = useState(1);
  const [startIdx, setStartIdx] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const onChangePage = (event: React.ChangeEvent<unknown>, targetPage: number) => {
    setPage(targetPage);
    setStartIdx((targetPage - 1) * COUNT_PER_PAGE);
  }

  useEffect(() => {
    if (orders) {
      setTotalCount(getTotalCount(orders.length));
    }
  }, [orders])

  console.log(startIdx, startIdx + COUNT_PER_PAGE);

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Typography variant="h5" sx={{textAlign: "left", marginTop: "1.5em"}}> 주문 현황 </Typography>
          <DefaultButton onClickMethod={() => setModalOpen(true)} text={"주문 생성하기"}></DefaultButton>
          <OrderFormModal open={modalOpen} setOpen={setModalOpen}/>
        </Grid>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1130 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>고객 아이디</StyledTableCell>
                  <StyledTableCell align="center">주소</StyledTableCell>
                  <StyledTableCell align="center">상세 주소</StyledTableCell>
                  <StyledTableCell align="center">총 주문 금액</StyledTableCell>
                  <StyledTableCell align="center">주문 일시</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.slice(startIdx, startIdx + COUNT_PER_PAGE).map((order) => (
                  <StyledTableRow key={order.id}>
                    <StyledTableCell  component="th" scope="row">
                      {order.customerId}
                    </StyledTableCell>
                    <StyledTableCell align="left">{order.address1}</StyledTableCell>
                    <StyledTableCell align="left">{order.address2}</StyledTableCell>
                    <StyledTableCell align="right">{order.totalPrice}</StyledTableCell>
                    <StyledTableCell align="center">{order.createdAt}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {orders && <StyledPagination count={totalCount} page={page} style={{margin: '2em auto'}} onChange={onChangePage}/>}
        </Grid>

        <Grid item xs={2} />
      </Grid>

    </Box>
    </>
  );
}

export default OrderListPage;
