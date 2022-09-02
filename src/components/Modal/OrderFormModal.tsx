import React, {useState} from 'react';
import {
  Box, Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import useSWR from "swr";
import {userApi} from "../../api";
import {User} from "../../model/modelType";
import DefaultButton from "../Button/defaultButton";

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
function OrderFormModal({open, setOpen} : {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {data: users, error} = useSWR<User[], Error>('users', userApi.getUserList);
  const [currentName, setCurrentName] = useState('');
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(event.target.value);
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-order-form"
      >
        <Box sx={style}>
          <form>
            <Typography variant="h5" id="modal-order-form" style={{marginBottom: '1.5em'}}>주문 생성</Typography>
            <TextField
              select
              label="주문자 명"
              helperText="유저리스트에서 주문할 사람를 선택해주세요"
              value={currentName}
              onChange={onChangeName}
              required
            >
              {users?.map((user) =>
                <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>)}
            </TextField>
              <FormControl required fullWidth style={{marginTop:'1em'}}>
                <InputLabel htmlFor="my-input">배송지 주소</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
              </FormControl>
              <FormControl required fullWidth style={{marginTop:'1em'}}>
                <InputLabel htmlFor="my-input">주문 금액</InputLabel>
                <Input type="number" id="my-input" aria-describedby="my-helper-text" />
              </FormControl>
            <DefaultButton type="submit" onClickMethod={() => 1} text={"생성하기"} />
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default OrderFormModal;