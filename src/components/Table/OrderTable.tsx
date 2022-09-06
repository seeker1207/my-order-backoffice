import {Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {changeDateFormat, numberToComma} from "../../util/formatUtil";
import React from "react";
import {Order} from "../../model/modelType";
import {useNavigate} from "react-router-dom";
import {StyledTableCell, StyledTableRow} from "./OrderTable.styles";

function OrderTable({orders} : {orders:Order[] | undefined}) {
  const navigate = useNavigate();
  return (
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
          {orders ? orders.map((order) => (
            <StyledTableRow key={order.id} onClick={() => navigate(`/orders/${order.id}`)}>
              <StyledTableCell  component="th" scope="row">
                {order.customerId}
              </StyledTableCell>
              <StyledTableCell align="left">{order.address1}</StyledTableCell>
              <StyledTableCell align="left">{order.address2}</StyledTableCell>
              <StyledTableCell align="right">{numberToComma(order.totalPrice)}</StyledTableCell>
              <StyledTableCell align="center">{changeDateFormat(order.createdAt)}</StyledTableCell>
            </StyledTableRow>
          )):
          <Typography> 주문 정보가 없습니다. </Typography>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;



export {}