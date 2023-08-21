const key = "basket";
//Функция для создания массива в Local Storage:
export function createArrayInLocalStorage() {
  if (!localStorage.getItem(key)) {
    const initialArray = [];
    const arrayString = JSON.stringify(initialArray);
    localStorage.setItem(key, arrayString);
  }
}

export function addObjectToArrayInLocalStorage(newObject) {
  createArrayInLocalStorage();
  // Получаем текущий массив из Local Storage
  const arrayString = localStorage.getItem(key);

  if (arrayString) {
    const currentArray = JSON.parse(arrayString);
    // Проверяем наличие объекта с таким же _id
    const existingObject = currentArray.find(
      (obj) => obj._id === newObject._id
    );
    if (existingObject) {
      // Если объект с таким _id уже существует, обновляем его
      existingObject.count = newObject.count;
    } else {
      // Если объекта с таким _id нет, добавляем новый объект
      currentArray.push({ ...newObject, count: 1 });
    }

    const updatedArrayString = JSON.stringify(currentArray);
    localStorage.setItem(key, updatedArrayString);
  }
}

//Функция для извлечения данных из Local Storage:
export function getDataFromLocalStorage() {
  const dataString = localStorage.getItem(key);

  if (dataString) {
    try {
      const data = JSON.parse(dataString);
      return data;
    } catch (error) {
      console.error("Error parsing data from Local Storage:", error);
      return null;
    }
  } else {
    console.error("Data not found in Local Storage.");
    return null;
  }
}

export function removeObjectFromArrayById(id) {
  const arrayString = localStorage.getItem(key);

  if (arrayString) {
    const currentArray = JSON.parse(arrayString);

    // Фильтруем массив, исключая объект с заданным id
    const updatedArray = currentArray.filter((obj) => obj._id !== id);

    const updatedArrayString = JSON.stringify(updatedArray);
    localStorage.setItem(key, updatedArrayString);
  }
}
