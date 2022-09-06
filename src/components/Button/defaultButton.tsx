import React from 'react';
import StyledButton from "./defaultButton.styles";

interface propsType {
  type?: "button" | "submit" | "reset" | undefined,
  text: string,
  onClickMethod?: (...args: any[]) => any;
  role: string,
}

function DefaultButton({role, type="button", text, onClickMethod}: propsType ) {
  return (
    <StyledButton role={role} type={type} variant="contained" onClick={onClickMethod}>{text}</StyledButton>
  );
}

export default DefaultButton;