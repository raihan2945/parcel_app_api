const { Sents, sequelize } = require("@/src/model");
const { badRequest, serverError, notFound } = require("@/src/utils/error");

//*: CREATE NEW
const createNew = async (body) => {
  const user = await Sents.create(body)
    .then((user) => {
      return user.toJSON();
    })
    .catch((err) => {
      console.log("Error is : ", err);
      throw serverError("Server Error. Schedule isn't not created");
    });

  return user;
};

//*: GET ITEM BY ID
const findItemById = async (id) => {
  const user = await Sents.findOne({ where: { id: id }, raw: true });

  if (!user) {
    throw notFound("Item not found");
  }

  return user;
};

//*: UPDATE ITEM BY ID
const updateItemById = async (id, bodyData) => {
  //? : Make update schema
  const newData = {};
  Object.keys(bodyData).forEach((key) => {
    newData[key] = bodyData[key] ?? newData[key];
  });

  const updatedData = await Sents.findOne({ where: { id: id } })
    .then((data) => {
      if (!data) {
        throw notFound("Item not found");
      }

      //?: Update the user with the new data
      return data.update(newData);
    })
    .then((data) => {
      return data?.toJSON();
    })
    .catch((error) => {
      console.log("ITEM UPDATE ERROR : ", error);
      if (error.status === 404) {
        throw notFound("Item not found");
      } else {
        throw serverError("Items not updated");
      }
    });

  return updatedData;
};

//*: UPDATE ITEM BY ID
const deleteItemById = async (id, bodyData) => {
  const deletedItem = await Sents.findOne({ where: { id: id } })
    .then(async (item) => {
      if (!item) {
        throw notFound("Item not found");
      }

      //? : Store deleteble item for return
      const return_item = item;

      //?: delete this chamber
      await item.destroy();

      //?: return deleted item
      return return_item;
    })
    .catch((error) => {
      if (error.status === 404) {
        throw notFound(error.message);
      }
    });

  return deletedItem ? deletedItem?.toJSON() : {};
};

//*: GET ALL ITEMS
const findAllItems = async ({ date, end_date }) => {
  let whereClause;

  if (date && end_date) {
    whereClause = sequelize.literal(
      `DATE(created_at) BETWEEN '${date}' AND '${end_date}'`
    );
  } else if (date) {
    whereClause = sequelize.literal(`DATE(created_at) = '${date}'`);
  }

  const users = await Sents.findAll({
    where: whereClause,
    order: [['created_at', 'DESC']],
    raw: true,
    
  });

  if (!users) {
    throw notFound("Item not found");
  }

  return users;
};

module.exports = {
  createNew,
  findItemById,
  updateItemById,
  findAllItems,
  deleteItemById,
};
