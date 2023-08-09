import React from "react";
import { CardActionArea } from "@mui/material";
import ShoppingBadge from "./badge/ShopingBadge";

const CatalogCenter = ({ item }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6" key={item.id}>
      <CardActionArea className="pt-2">
        <div className="action">
          <img
            src={item.img[0]}
            className="card-img-top w-75 h-75"
            alt={item.name}
          />
          <div className="card-body">
            <h5 className="card-title p-2 pb-4">{item.name}</h5>
          </div>
        </div>
      </CardActionArea>
      <div className="card-body">
        <p className="card-text p-2 pb-4">
          3800 руб. <ShoppingBadge count={3} />
        </p>
      </div>
    </div>
  );
};

export default CatalogCenter;
