const scheduleSerivce = require("@/src/lib/schedule");
const inputSchema = require("@/src/validators/inputValidation");

const getAllItems = async (req, res, next) => {
  const date = req.query.date;

  const validationProperties = [
    { name: "id", type: "number", required: false },
  ];

  //* BUILD INPUT SCHEMA
  const buildedSchema = inputSchema(validationProperties);

  //* : VALIDATE INPUT DATA
  const { error } = buildedSchema.validate({}, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: error.details.map((details) => {
        return details.message;
      }),
    });
  }

  try {
    //*: CALL AUTH SERVICE TO SEND OTP TO USERS
    const items = await scheduleSerivce.findAllItems({date});

    const response = {
      code: 200,
      message: "Items get Successfully",
      data: [...items],
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllItems;
