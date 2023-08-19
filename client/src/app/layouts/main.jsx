/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import CatalogLeft from "../components/ui/CatalogLeft";
import Pagination from "../components/ui/pagination";
import CatalogCenter from "../components/ui/catalogCenter";
import allCatalog from "../api/fake.api/catalog";
import { getCategoryList } from "../store/category";
import categoryService from "../services/category.service";

const Main = () => {
  const [catalog, setCatalog] = React.useState([]);
  const [selectedCatalog, setSelectedCatalog] = React.useState([]);
  // const [category, setCategory] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState();
  const category = useSelector(getCategoryList());

  //тест
  const testCategory = async () => {
    try {
      const { content } = await categoryService.get();
      console.log(content);
    } catch (error) {
      console.log(error);
    }
  };
  testCategory();

  console.log("category", category);

  // const catalogConverter = (itm) => {
  //   const array = [];
  //   for (const key in itm) {
  //     if (itm.hasOwnProperty(key)) {
  //       array.push(...itm[key]);
  //     }
  //   }
  //   // console.log(array);
  //   return array;
  // };

  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await allCatalog.fetchAll();
        setCatalog(res);
        setSelectedCatalog(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // React.useEffect(() => {
  //   api.category.fetchAll().then((data) => setCategory(data));
  // }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        catalog.filter((item) => item.name.includes(event.target.value))
      );
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
      {/* ) : (
        <Loader />
      )} */}
    </div>
  );
};

export default Main;
