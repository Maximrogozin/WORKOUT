// import React from "react";

// const SelectField = ({ value }) => {
//   return (
//     <>
//       <div className="form-check">
//         <input
//           className="form-check-input"
//           type="radio"
//           name="flexRadioDefault"
//           id="flexRadioDefault1"
//           value={value}
//         />
//         <label className="form-check-label" for="flexRadioDefault1">
//           Не выбрано
//         </label>
//       </div>
//       <div className="form-check">
//         <input
//           className="form-check-input"
//           type="radio"
//           name="flexRadioDefault"
//           id="flexRadioDefault2"
//           value={value}
//           checked
//         />
//         <label className="form-check-label">Администратор</label>
//       </div>
//     </>
//   );
// };

// export default SelectField;

import React, { useState } from "react";

const SelectField = ({ value }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleOptionChange = (event) => {
    const value = event.target.value === "true";
    setSelectedValue(value);
  };
  return (
    <div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          value="false"
          checked={selectedValue === false}
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Не выбрано
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          value="true"
          checked={selectedValue === true}
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Администратор
        </label>
      </div>
    </div>
  );
};

export default SelectField;
