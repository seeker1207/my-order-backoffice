import React, {useRef, useState} from 'react';
import {
  Box,
  Grid,
  styled,
  TextField,
  Typography
} from "@mui/material";
import DefaultButton from "../../../components/Button/defaultButton";
import useSWR from "swr";
import {Order} from "../../../model/modelType";
import {orderApi} from "../../../api";
import {useParams} from "react-router-dom";

const StyledTextField = styled(TextField)`
  margin-bottom: 2em;
`

function OrderDetailPage() {
  const { data: orders, error } = useSWR<Order[], Error>('orders', orderApi.getOrderList)
  const { orderId } = useParams();
  const [readMode, setReadMode] = useState(true);
  const textField = useRef<HTMLInputElement>(null);

  const targetOrder = orders?.find((order) => order.id === parseInt(orderId as string));

  const onClickModifyButton = () => {
    setReadMode(false);
    textField.current?.focus();

  }
  console.log(orderId);
  console.log(orders);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Typography variant="h5" sx={{textAlign: "left", marginTop: "1.5em"}}> 주문 상세 정보 </Typography>
          <DefaultButton onClickMethod={onClickModifyButton} text={readMode? "수정": "저장"}></DefaultButton>
        </Grid>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={8}>
          {targetOrder &&
            <div>
              <StyledTextField label="주문 ID" defaultValue={targetOrder.id} InputProps={{readOnly: true}}/>
              <StyledTextField inputRef={textField} label="주소" fullWidth  defaultValue={targetOrder.address1} InputProps={{readOnly: readMode}}/>
              <StyledTextField label="상세 주소" fullWidth defaultValue={targetOrder.address2} InputProps={{readOnly: readMode}}/>
              <div>
                <StyledTextField label="주문 금액" defaultValue={targetOrder.totalPrice} InputProps={{readOnly: readMode}}/>
              </div>
              <StyledTextField label="주문 생성일" defaultValue={targetOrder.createdAt} InputProps={{readOnly: true}}/>
            </div>
          }

        </Grid>

        <Grid item xs={2} />
      </Grid>

    </Box>
  );
}

export default OrderDetailPage;
