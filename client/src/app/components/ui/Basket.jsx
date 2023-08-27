import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Basket = ({ item, handleDecrement, handleIncrement, handleDelete }) => {
  return (
    <div className="card mb-3" style={{ maxwidth: "540px" }} key={item._id}>
      <div className="row g-0">
        <div className="col-md-2 d-none d-md-block">
          <Link
            to={`/product/${item._id}`}
            style={{
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {
              <img
                src={item.img[0]}
                className="img-fluid rounded-start"
                alt={item.name}
                width="150"
                height="150"
              />
            }
          </Link>
        </div>
        <div className="col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
          <div>
            <div className="p-4 text-center p-md-5">{item.name}</div>
          </div>
        </div>
        <div
          className="col-md-4 col-sm-6 d-flex justify-content-center align-items-center"
          sx={{ minHeight: "150px" }}
        >
          <div className="col-sm-6">
            <button
              className="btn btn-primary "
              onClick={() => handleIncrement(item._id)}
            >
              <i className="bi bi-plus"></i>
            </button>
            <span className="m-2">{item.count}</span>
            <button
              className="btn btn-primary"
              onClick={() => handleDecrement(item._id)}
            >
              <i className="bi bi-dash"></i>
            </button>
          </div>
          <div className="col-sm-6 d-flex p-2 justify-content-center align-items-center">
            <h6>{`${item.price * item.count} руб.`}</h6>
            <button
              onClick={() => handleDelete(item._id)}
              className="btn"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: "5px",
              }}
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Basket.propTypes = {
  item: PropTypes.object,
  handleDecrement: PropTypes.func,
  handleIncrement: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default Basket;
