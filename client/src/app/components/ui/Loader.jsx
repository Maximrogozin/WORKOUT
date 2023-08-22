import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Loader() {
  return (
    <Box>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
}
