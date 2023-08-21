/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import CatalogLeft from "../components/ui/CatalogLeft";
import Pagination from "../components/ui/pagination";
import CatalogCenter from "../components/ui/catalogCenter";
import { getCategoryList } from "../store/category";
import { getCatalogsList } from "../store/catalog";
import { Copyright } from "../components/ui/footer";

const Main = () => {
  const [selectedCatalog, setSelectedCatalog] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState();
  const category = useSelector(getCategoryList());
  const catalog = useSelector(getCatalogsList());
  useEffect(() => {
    setSelectedCatalog(catalog);
  }, [catalog]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const clearFilter = () => {
    setSelectedCatalog(catalog);
    setSelectedCategory("");
  };
  const handleCategorySelect = (item) => {
    if (selectedCategory === item._id) {
      clearFilter();
    } else {
      setSelectedCategory(item._id);
      setSelectedCatalog(catalog);
      setSelectedCatalog(catalog.filter((n) => n.category === item.category));
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    if (event.target.value) {
      setSelectedCategory("");
      setSelectedCatalog(
        catalog.filter((item) =>
          item.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    } else if (event.target.value === "") {
      setSelectedCatalog(catalog);
    }
  };

  const count = selectedCatalog.length;
  const pageSize = 20;

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };
  const catalogCrop = paginate(selectedCatalog, currentPage, pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedCatalog]);
  // if (load && catalog === null) {
  //   return <Loader />;
  // }
  return (
    <div className="container pt-5">
      <div className="row d-flex text-center">
        <CatalogLeft
          clearFilter={clearFilter}
          items={category}
          onItemSelect={handleCategorySelect}
          selectedItem={selectedCategory}
        />

        <div className="col-md-10 ">
          <div className="row d-block ">
            <div className="col-md-12 mt-5 ">
              <input
                className="form-control"
                type="text"
                placeholder="Поиск"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-12 mt-5">
              <div className="d-flex">
                <div className="row row-cols-1 row-cols-md-4">
                  {catalogCrop.map((item, index) => (
                    <CatalogCenter key={index} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
      <Copyright sx={{ mt: 5 }} />
    </div>
  );
};

export default Main;
