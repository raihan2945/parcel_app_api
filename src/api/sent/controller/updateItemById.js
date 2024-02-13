const sentService = require("@/src/lib/sent");
const inputSchema = require("@/src/validators/inputValidation");

const updateItemById = async (req, res, next) => {
  const id = req.params.id;
  const bodyData = req.body;

  // const validationProperties = [
  //   { name: "id", type: "number", required: true },
  //   { name: "name", type: "string", required: false },
  //   { name: "folder_id", type: "string", required: false },
  //   { name: "status", type: "string", required: false },
  // ];


  // //* BUILD INPUT SCHEMA
  // const buildedSchema = inputSchema(validationProperties);

  // //* : VALIDATE INPUT DATA
  // const { error } = buildedSchema.validate(
  //   { id, ...bodyData },
  //   { abortEarly: false }
  // );

  // if (error) {
  //   return res.status(400).json({
  //     error: error.details.map((details) => {
  //       return details.message;
  //     }),
  //   });
  // }

  try {
    //*:
    const item = await sentService.updateItemById(id, bodyData);

    const response = {
      code: 200,
      message: "Item Updated Successfully",
      data: {
        ...item,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateItemById;
