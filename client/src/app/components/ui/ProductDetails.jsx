import React from "react";
import PropTypes from "prop-types";

const ProductDetail = ({ detail, title }) => {
  return (
    <>
      <h2 className="text-center">{title}</h2>
      <ul className="m-5">
        {detail.map((item, index) => (
          <li className="m-2" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

ProductDetail.propTypes = {
  detail: PropTypes.array,
  title: PropTypes.string,
};

export default ProductDetail;
