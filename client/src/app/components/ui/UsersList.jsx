import React from "react";
import PropTypes from "prop-types";

const UsersList = ({ item, handleDelete, setEditUser }) => {
  return (
    <li className="list-group-item p-2" key={item._id}>
      <div className="row text-center align-items-center">
        <div className="col text-center">{item.name}</div>
        <div className="col">{item.email}</div>
        <div className="col">{item.rootAdmin ? "Да" : "Нет"}</div>
        <div className="col">{item.rootManager ? "Да" : "Нет"}</div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => setEditUser(item)}
          >
            Редактировать
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(item._id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </li>
  );
};

UsersList.propTypes = {
  item: PropTypes.object,
  handleDelete: PropTypes.func,
  setEditUser: PropTypes.func,
};

export default UsersList;
