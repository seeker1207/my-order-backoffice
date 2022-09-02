import {Button, styled} from "@mui/material";

const StyledButton = styled(Button)(({theme}) =>`
  float: right;
  background-color: ${theme.palette.common.black};
  :hover {
    background-color: gray;
  }
  margin-top: 1.5em;
`)

export default StyledButton;