import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "../ui/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  getCatalogsById,
  getIsLoggedIn,
  incrementCount,
  updateCatalog,
} from "../../store/catalog";
import { Copyright } from "../ui/footer";

const ProductDescriptionPage = () => {
  const location = useLocation();
  const admin = useSelector(getIsLoggedIn);
  const path = location.pathname.split("/").filter((x) => x);
  const id = path[path.length - 1];
  const product = useSelector(getCatalogsById(id));
  const dispatch = useDispatch();

  const [editedProduct, setEditedProduct] = useState(product);
  const [isEditing, setIsEditing] = useState(false);
  const handleIncrement = (id) => {
    dispatch(incrementCount(id));
    setEditedProduct((prevEditedProduct) => ({
      ...prevEditedProduct,
      count: prevEditedProduct.count + 1,
    }));
  };

  const handleSave = () => {
    dispatch(updateCatalog(editedProduct, editedProduct._id));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(!isEditing);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="row">
          <div className="col-md-6 p-auto text-center">
            {isEditing ? (
              <>
                <h2 className="text text-danger">Редактирование названия</h2>
                <textarea
                  autoFocus
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, name: e.target.value })
                  }
                />
              </>
            ) : (
              <h2 className="card-title">{editedProduct.name}</h2>
            )}
            {/* редактирование картинок */}
            {editedProduct.img && (
              <>
                <Slider images={editedProduct.img} sx={{ margin: "auto" }} />
                {isEditing ? (
                  <h2 className="text text-danger">
                    Редактирование, удаление и добавление ссылок к изображениям
                  </h2>
                ) : (
                  ""
                )}
                <ul className="m-5">
                  {isEditing &&
                    editedProduct.img.map((item, index) => (
                      <li className="m-2" key={index}>
                        <>
                          <img src={item} alt="item" className="w-25 h-25" />
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              setEditedProduct({
                                ...editedProduct,
                                img: editedProduct.img.map((equip, i) =>
                                  i === index ? e.target.value : equip
                                ),
                              })
                            }
                          />
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              setEditedProduct({
                                ...editedProduct,
                                img: editedProduct.img.filter(
                                  (equip, i) => i !== index
                                ),
                              })
                            }
                          >
                            Удалить
                          </button>
                        </>
                      </li>
                    ))}
                  {isEditing && (
                    <li>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          setEditedProduct({
                            ...editedProduct,
                            img: [...editedProduct.img, ""],
                          })
                        }
                      >
                        Добавить ссылку на изображение
                      </button>
                    </li>
                  )}
                </ul>
              </>
            )}

            {/* конец редактирования картинок  */}
          </div>
          <div className="col-md-6 text-center p-5">
            {isEditing ? (
              <>
                <h2 className="text text-danger">Редактирование цены</h2>
                <input
                  type="text"
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </>
            ) : (
              <h4>{`Цена ${editedProduct.price} руб.`}</h4>
            )}
            <div className="box mb-2">
              {admin && (
                <>
                  {isEditing && (
                    <button
                      className="btn btn-success m-2"
                      onClick={handleSave}
                    >
                      Сохранить
                    </button>
                  )}
                  <button
                    className="btn btn-danger m-2"
                    // onClick={() => setIsEditing(!isEditing)}
                    onClick={handleCancel}
                  >
                    {isEditing ? "Отмена" : "Редактировать"}
                  </button>
                </>
              )}
              {editedProduct.count > 0 ? (
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleIncrement(editedProduct._id)}
                >
                  В корзине{" "}
                  <span className="badge text-bg-secondary">
                    {editedProduct.count}
                  </span>
                </button>
              ) : (
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleIncrement(editedProduct._id)}
                >
                  В корзину
                </button>
              )}
            </div>
            {/* Редактирование размеров */}

            {editedProduct.proportions && (
              <>
                <h2>Размеры</h2>
                <img
                  src={editedProduct.proportions}
                  className="w-50"
                  alt="Размеры"
                />
              </>
            )}
            <>
              {isEditing ? (
                <h2 className="text text-danger">
                  Редактирование, удаление и добавление ссылки на изображение с
                  размерами
                </h2>
              ) : (
                ""
              )}
              <div className="m-5">
                {isEditing && (
                  <div className="m-2">
                    <>
                      <img
                        src={editedProduct.proportions}
                        alt="item"
                        className="w-25 h-25"
                      />
                      <input
                        type="text"
                        value={editedProduct.proportions}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            proportions: e.target.value,
                          })
                        }
                      />
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          setEditedProduct({
                            ...editedProduct,
                            proportions: "",
                          })
                        }
                      >
                        Удалить
                      </button>
                    </>
                  </div>
                )}
              </div>
            </>

            {/* конец редактирования размеров */}
          </div>
        </div>
        <div className="row p-5">
          <h2 className="text-center">Описание</h2>
          {isEditing ? (
            <>
              <h2 className="text text-danger">Редактирование описания</h2>
              <textarea
                value={editedProduct.description}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
              />
            </>
          ) : (
            <div className="card-text">{editedProduct.description}</div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            {editedProduct.characteristics && (
              <>
                <h2 className="text-center">Характеристики</h2>
                <ul className="m-5">
                  {editedProduct.characteristics.map((item, index) => (
                    <li className="m-2" key={index}>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              setEditedProduct({
                                ...editedProduct,
                                characteristics:
                                  editedProduct.characteristics.map((char, i) =>
                                    i === index ? e.target.value : char
                                  ),
                              })
                            }
                          />
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              setEditedProduct({
                                ...editedProduct,
                                characteristics:
                                  editedProduct.characteristics.filter(
                                    (char, i) => i !== index
                                  ),
                              })
                            }
                          >
                            Удалить
                          </button>
                        </>
                      ) : (
                        `- ${item}`
                      )}
                    </li>
                  ))}
                  {isEditing && (
                    <li>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          setEditedProduct({
                            ...editedProduct,
                            characteristics: [
                              ...editedProduct.characteristics,
                              "",
                            ],
                          })
                        }
                      >
                        Добавить характеристику
                      </button>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
          <div className="col-md-6">
            {editedProduct.equipment && (
              <>
                <h2 className="text-center">
                  {editedProduct.equipment.length ? (
                    <span> Комплектация</span>
                  ) : (
                    ""
                  )}
                </h2>
                <ul className="m-5">
                  {editedProduct.equipment.map((item, index) => (
                    <li className="m-2" key={index}>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              setEditedProduct({
                                ...editedProduct,
                                equipment: editedProduct.equipment.map(
                                  (equip, i) =>
                                    i === index ? e.target.value : equip
                                ),
                              })
                            }
                          />
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              setEditedProduct({
                                ...editedProduct,
                                equipment: editedProduct.equipment.filter(
                                  (equip, i) => i !== index
                                ),
                              })
                            }
                          >
                            Удалить
                          </button>
                        </>
                      ) : (
                        `- ${item}`
                      )}
                    </li>
                  ))}
                  {isEditing && (
                    <li>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          setEditedProduct({
                            ...editedProduct,
                            equipment: [...editedProduct.equipment, ""],
                          })
                        }
                      >
                        Добавить комплектацию
                      </button>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <Copyright sx={{ m: 5 }} />
    </div>
  );
};

export default ProductDescriptionPage;
