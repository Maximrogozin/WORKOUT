import React, { forwardRef } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const ShoppingBadge = forwardRef((props, ref) => {
  const { count } = props;
  return (
    <IconButton aria-label="cart" ref={ref} {...props}>
      <StyledBadge badgeContent={count} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
});

export default ShoppingBadge;
