import React from "react";
import PropTypes from "prop-types";

const ProductDetail = ({ detail }) => {
  return (
    <>
      <h2 className="text-center">Характеристики</h2>
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
};

export default ProductDetail;
