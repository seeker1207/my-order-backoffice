import React, {useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Typography
} from "@mui/material";

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

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-order-form"
      >
        <Box sx={style}>
          <Typography variant="h5" id="modal-order-form" style={{marginBottom: '1.5em'}}>주문 생성</Typography>
          <TextField
            select
            label="주문자 명"
            helperText="유저리스트에서 주문할 사람를 선택해주세요"
          >
            <MenuItem value={"가나다"}>11</MenuItem>
            <MenuItem value={"루루루"}>22</MenuItem>
            <MenuItem value={"dhdhdh"}>33</MenuItem>
          </TextField>
            <FormControl fullWidth style={{marginTop:'1em'}}>
              <InputLabel htmlFor="my-input">배송지 주소</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl fullWidth style={{marginTop:'1em'}}>
              <InputLabel htmlFor="my-input">주문 금액</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

export default OrderFormModal;