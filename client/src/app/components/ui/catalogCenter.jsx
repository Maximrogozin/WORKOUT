import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardActionArea } from "@mui/material";

import ShoppingBadge from "./badge/ShopingBadge";
import { incrementCount } from "../../store/catalog";
import { truncateTextToThreeWords } from "../../utils/sort";

const CatalogCenter = ({ item }) => {
  const dispatch = useDispatch();
  const notify = () =>
    toast.success("Добавлено !", {
      position: toast.POSITION.TOP_CENTER,
    });
  const handleClick = (item) => {
    dispatch(incrementCount(item._id));
    notify();
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6" key={item._id}>
      <Link
        to={`/product/${item._id}`}
        style={{
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <CardActionArea
          className="pt-2 "
          sx={{ minHeight: 300, borderRadius: "10px" }}
        >
          <div className="action">
            <img
              src={item.img[0]}
              className="card-img-top w-75 h-75"
              alt={item.name}
            />
            <div className="card-body">
              <h5 className="card-title p-2 pb-4">
                {truncateTextToThreeWords(item.name)}
              </h5>
            </div>
          </div>
        </CardActionArea>
      </Link>
      <div className="card-body" onClick={() => handleClick(item)}>
        <div className="card-text p-2 pb-4">
          <p>{`${item.price} руб.`}</p> <ShoppingBadge count={item.count} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

CatalogCenter.propTypes = {
  item: PropTypes.object,
};

export default CatalogCenter;
