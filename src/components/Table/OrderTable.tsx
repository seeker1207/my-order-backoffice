import {Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {changeDateFormat, numberToComma} from "../../util/formatUtil";
import React from "react";
import {Order, User} from "../../model/modelType";
import {useNavigate} from "react-router-dom";
import {StyledTableCell, StyledTableRow} from "./OrderTable.styles";
import useSWR from "swr";
import {userApi} from "../../api";

function OrderTable({orders} : {orders:Order[] | undefined}) {
  const navigate = useNavigate();
  const {data: users, error} = useSWR<User[], Error>('users', userApi.getUserList);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1130 }} role="orderTable" aria-label="order table">
        <TableHead>
          <TableRow>
            <StyledTableCell>주문 ID</StyledTableCell>
            <StyledTableCell align="center">주문 일시</StyledTableCell>
            <StyledTableCell align="center">주문자 명</StyledTableCell>
            <StyledTableCell align="center">배송지 주소</StyledTableCell>
            <StyledTableCell align="center">주문 금액</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders ? orders.map((order) => (
            <StyledTableRow role="listItem" key={order.id} onClick={() => navigate(`/orders/${order.id}`)}>
              <StyledTableCell role="orderId" component="th" scope="row" data-testid={order.id}>
                {order.id}
              </StyledTableCell>
              <StyledTableCell align="center">{changeDateFormat(order.createdAt)}</StyledTableCell>
              <StyledTableCell align="center">{users?.find((user) => user.id === order.customerId)?.name}</StyledTableCell>
              <StyledTableCell align="left">{`${order.address1} ${order.address2}`}</StyledTableCell>
              <StyledTableCell align="right">{numberToComma(order.totalPrice)}</StyledTableCell>

            </StyledTableRow>
          )):
          <Typography role="noList"> 주문 정보가 없습니다. </Typography>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;



export {}