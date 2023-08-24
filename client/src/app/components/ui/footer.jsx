import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        WORKOUT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
