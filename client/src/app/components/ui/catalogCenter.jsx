import React, { useEffect } from "react";
import { CardActionArea } from "@mui/material";
import ShoppingBadge from "./badge/ShopingBadge";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const CatalogCenter = ({ item }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // const handleClick = (id) => {
  //   // console.log("click", id);
  //   // <Link to={`/product/${product._id}`}>{product.name}</Link>;
  // };
  return (
    <div className="col-xl-3 col-lg-4 col-md-6" key={item.id}>
      {item ? (
        <Link to={`/product/${item.id}`} className="link-unstyled">
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
              <p>{`${item.price} руб.`}</p> <ShoppingBadge count={3} />
            </p>
          </div>
        </Link>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CatalogCenter;
