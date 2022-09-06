import React, {useEffect, useRef, useState} from 'react';
import {
  Box, Grid, Typography
} from '@mui/material';
import useSWR from 'swr';
import {orderApi} from "../../../api";
import {Order} from "../../../model/modelType";
import OrderFormModal from "../../../components/Modal/OrderFormModal";
import DefaultButton from "../../../components/Button/defaultButton";
import {useNavigate} from "react-router-dom";
import {StyledPagination} from "./OrderListPage.styles";
import OrderTable from "../../../components/Table/OrderTable";

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
          <OrderTable orders={orders?.slice(startIdx, startIdx + COUNT_PER_PAGE)} />
          {orders && <StyledPagination count={totalCount} page={page} style={{margin: '2em auto'}} onChange={onChangePage}/>}
        </Grid>
        <Grid item xs={2} />
      </Grid>

    </Box>
    </>
  );
}

export default OrderListPage;
