const Category = require("../models/Category");
const categoryMock = require("../mock/category");
const Catalog = require("../models/Catalogs");
const catalogMock = require("../mock/catalog");

module.exports = async () => {
  await updateCategories();
  await updateCatalogs();
};

async function updateCategories() {
  const categories = await Category.find();
  if (categories.length !== categoryMock.length) {
    await createInitialEntity(Category, categoryMock);
  }
}

async function updateCatalogs() {
  const catalogs = await Catalog.find();
  if (catalogs.length !== catalogMock.length) {
    await createInitialEntity(Catalog, catalogMock);
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item.id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
