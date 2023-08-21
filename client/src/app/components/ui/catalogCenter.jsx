import React from "react";
import { CardActionArea } from "@mui/material";
import ShoppingBadge from "./badge/ShopingBadge";
// import Loader from "./Loader";
import { Link } from "react-router-dom";
import { addObjectToArrayInLocalStorage } from "../../utils/basket.localStorage";
import { incrementCount } from "../../store/catalog";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { getCatalogsLoadingStatus } from "../../store/catalog";

const CatalogCenter = ({ item }) => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  const dispatch = useDispatch();

  // const load = useSelector(getCatalogsLoadingStatus());

  function truncateTextToThreeWords(text) {
    const words = text.split(" ");
    if (words.length <= 3) {
      return text;
    }
    return words.slice(0, 3).join(" ") + "...";
  }

  const handleClick = (item) => {
    console.log("click", item);
    dispatch(incrementCount(item._id));
    addObjectToArrayInLocalStorage(item);
  };
  return (
    <div className="col-xl-3 col-lg-4 col-md-6" key={item._id}>
      {/* {!load ? ( */}
      <Link to={`/product/${item._id}`} className="link-unstyled">
        <CardActionArea className="pt-2">
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
        <p className="card-text p-2 pb-4">
          <p>{`${item.price} руб.`}</p> <ShoppingBadge count={item.count} />
        </p>
      </div>

      {/* ) : (
        <Loader />
      )} */}
    </div>
  );
};

export default CatalogCenter;
