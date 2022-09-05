import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  Grid,
  styled,
  TextField,
  Typography
} from "@mui/material";
import DefaultButton from "../../../components/Button/defaultButton";
import useSWR, {mutate} from "swr";
import {Order} from "../../../model/modelType";
import {orderApi} from "../../../api";
import {useParams} from "react-router-dom";
import useInput from "../../../hooks/useInput";

const StyledTextField = styled(TextField)`
  margin-bottom: 2em;
`

function OrderDetailPage() {
  const { data: orders, error } = useSWR<Order[], Error>('orders', orderApi.getOrderList)
  const { orderId } = useParams();
  const [readMode, setReadMode] = useState(true);
  const [address1, onChangeAddress1, setAddress1] = useInput('');
  const [address2, onChangeAddress2, setAddress2] = useInput('');
  const [totalPrice, onChangeTotalPrice, setTotalPrice] = useInput('');
  const [createdAt, onChangeCreatedAt, setCreatedAt] = useInput('');
  const textField = useRef<HTMLInputElement>(null);
  const targetOrder = useRef({} as Order);

  useEffect(() => {
    if (orders) {
      targetOrder.current = orders.find((order) => order.id === parseInt(orderId as string)) as Order;
      setAddress1(targetOrder.current.address1);
      setAddress2(targetOrder.current.address2);
      setTotalPrice(targetOrder.current.totalPrice + '');
      setCreatedAt(targetOrder.current.createdAt);
    }

  }, [orders])

  const onClickModifyOrSaveButton = async () => {
    if (readMode) {
      setReadMode(false);
      textField.current?.focus();
    } else {
      try {
        await orderApi.modifyOrder({customerId: targetOrder.current.customerId, address1, address2, totalPrice: parseInt(totalPrice)}, parseInt(orderId as string));
        await mutate('orders');
        setReadMode(true);
      } catch (e) {
        alert('주문 정보 수정에 실패 하였습니다.');
      }
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Typography variant="h5" sx={{textAlign: "left", marginTop: "1.5em"}}> 주문 상세 정보 </Typography>
          <DefaultButton onClickMethod={onClickModifyOrSaveButton} text={readMode? "수정": "저장"}></DefaultButton>
        </Grid>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={8}>
          {
            <div>
              <StyledTextField label="주문 ID" value={orderId} InputProps={{readOnly: true}}/>
              <StyledTextField inputRef={textField} label="주소" fullWidth value={address1} InputProps={{readOnly: readMode}} onChange={onChangeAddress1}/>
              <StyledTextField label="상세 주소" fullWidth value={address2} InputProps={{readOnly: readMode}} onChange={onChangeAddress2}/>
              <div>
                <StyledTextField label="주문 금액" value={totalPrice} InputProps={{readOnly: readMode}} onChange={onChangeTotalPrice}/>
              </div>
              <StyledTextField label="주문 생성일" value={createdAt} InputProps={{readOnly: true}}/>
            </div>
          }

        </Grid>

        <Grid item xs={2} />
      </Grid>

    </Box>
  );
}

export default OrderDetailPage;
