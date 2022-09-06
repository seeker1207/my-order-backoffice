import React, {ChangeEventHandler, FormEvent, useCallback, useState} from 'react';
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import useSWR, {useSWRConfig} from "swr";
import {userApi, orderApi} from "../../api";
import {User} from "../../model/modelType";
import DefaultButton from "../Button/defaultButton";
import useInput from "../../hooks/useInput";
import {StyledBox} from "./OrderFormModal.styles";

const style = {
  width: 700,
  boxShadow: 24,
  p: 4,
}

function OrderFormModal({open, setOpen} : {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {data: users, error} = useSWR<User[], Error>('users', userApi.getUserList);
  const [currentName, setName] = useState('');
  const [customerId, setCustomerId] = useState(0);
  const [address1, onChangeAddress1, setAddress1] = useInput('');
  const [address2, onChangeAddress2, setAddress2] = useInput('');
  const [totalPrice, onChangeTotalPrice, setTotalPrice] = useInput('');
  const { mutate } = useSWRConfig();

  const onChangeName: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const currentName = event.target.value;
    setName(currentName);
    const targetUser = users?.find((user) => user.name === currentName);
    if (targetUser) setCustomerId(targetUser.id);
  }, [users]);

  const onSubmitOrder = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const priceNumber = parseInt(totalPrice)
    try {
      await orderApi.saveOrder({customerId, address1, address2, totalPrice: priceNumber});
      await mutate('orders');
      onClose();

    } catch(e) {
      alert('주문 생성에 실패하였습니다.')
    }
    // console.log(customerId, address1, address2, totalPrice);
  }, [totalPrice, customerId, address1, address2])

  const onClose = useCallback(() => {
    setOpen(false);
    setName('');
    setCustomerId(0);
    setAddress1('');
    setAddress2('');
    setTotalPrice('');
  }, [])


  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-order-form"
        role="postOrderModal"
      >
        <StyledBox sx={style}>
          <form onSubmit={onSubmitOrder}>
            <Typography variant="h5" id="modal-order-form" style={{marginBottom: '1.5em'}}>주문 생성</Typography>
            <TextField
              select
              label="주문자 이름"
              helperText="유저리스트에서 주문할 사람를 선택해주세요"
              value={currentName}
              onChange={onChangeName}
              required
              inputProps={{ "data-testid": "my-order-person" }}
            >
              {users?.map((user) =>
                <MenuItem role="my-order-person" key={user.id} value={user.name}>{user.name}</MenuItem>)}
            </TextField>
              <FormControl required fullWidth style={{marginTop:'1em'}}>
                <InputLabel htmlFor="my-address">배송지 주소</InputLabel>
                <Input value={address1} id="my-address" onChange={onChangeAddress1} inputProps={{ "data-testid": "my-address" }}/>
              </FormControl>
              <FormControl required fullWidth style={{marginTop:'1em'}}>
                <InputLabel htmlFor="my-detail-address">상세 주소</InputLabel>
                <Input value={address2} id="my-detail-address" onChange={onChangeAddress2} inputProps={{ "data-testid": "my-detail-address" }}/>
              </FormControl>
              <FormControl required fullWidth style={{marginTop:'1em'}}>
                <InputLabel htmlFor="my-total-price">주문 금액</InputLabel>
                <Input value={totalPrice} id="my-total-price" type="number" onChange={onChangeTotalPrice} inputProps={{ "data-testid": "my-total-price" }}/>
              </FormControl>
            <DefaultButton role="postButton" type="submit" onClickMethod={() => 1} text={"생성하기"} />
          </form>
        </StyledBox>
      </Modal>
    </div>
  );
}

export default OrderFormModal;