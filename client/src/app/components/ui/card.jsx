import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Cards = ({ item }) => {
  return (
    <CardActionArea sx={{ maxWidth: 250, margin: 5, padding: 2 }}>
      <CardMedia
        component="img"
        height="150"
        width="100"
        image={item.img}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item.name}
        </Typography>
      </CardContent>
    </CardActionArea>
  );
};

export default Cards;
