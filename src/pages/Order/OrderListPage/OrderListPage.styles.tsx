import {Pagination, paginationClasses, TableContainer, styled} from "@mui/material";

const TableContainerWrapper = styled(TableContainer)`
  background: #d7d8ee;
`

const StyledPagination = styled(Pagination)`
  .${paginationClasses.ul} {
    justify-content: center;
  }
`

export {TableContainerWrapper, StyledPagination};
