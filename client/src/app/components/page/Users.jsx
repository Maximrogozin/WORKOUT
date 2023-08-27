import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteUser, getUsersList, updateUser } from "../../store/users";
import TextField from "../common/form/textField";
import UsersList from "../ui/UsersList";

const UserList = () => {
  const users = useSelector(getUsersList());
  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState({});
  const handleSafe = () => {
    dispatch(updateUser(editUser));
  };
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <div className="container">
      <div className="row">
        <h1 className="p-2 text-center">Пользователи</h1>
        {users && (
          <ul className="list-group">
            <li className="list-group-item p-2">
              <div className="row text-center">
                <div className="col text-center">Имя</div>
                <div className="col">Email</div>
                <div className="col">Права администратора</div>
                <div className="col">Права менеджера</div>
                <div className="col"></div>
              </div>
            </li>
            {users.map((item) => (
              <UsersList
                item={item}
                key={item._id}
                handleDelete={handleDelete}
                setEditUser={setEditUser}
              />
            ))}
          </ul>
        )}
        {editUser && (
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Редактирование пользователя
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h5 className="text">Редактировать имя</h5>
                  <TextField
                    autoFocus
                    type="text"
                    value={editUser.name}
                    onChange={(e) =>
                      setEditUser({ ...editUser, name: e.target.value })
                    }
                  />
                  <h5 className="text">Редактировать EMAIL</h5>
                  <TextField
                    autoFocus
                    type="text"
                    value={editUser.email}
                    options={["Да", "Нет"]}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                  />
                  <h5 className="text-center">Права доступа</h5>
                  <>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio1"
                        autoComplete="off"
                        // checked
                        onChange={() =>
                          setEditUser({
                            ...editUser,
                            rootAdmin: false,
                            rootManager: false,
                          })
                        }
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btnradio1"
                      >
                        Не выбрано
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio2"
                        autoComplete="off"
                        onChange={() =>
                          setEditUser({
                            ...editUser,
                            rootAdmin: true,
                            rootManager: false,
                          })
                        }
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btnradio2"
                      >
                        Администратор
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio3"
                        autoComplete="off"
                        onChange={() =>
                          setEditUser({
                            ...editUser,
                            rootAdmin: false,
                            rootManager: true,
                          })
                        }
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btnradio3"
                      >
                        Менеджер
                      </label>
                    </div>
                  </>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={handleSafe}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
