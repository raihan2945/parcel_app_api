const riService = require("@/src/lib/received_international");
const inputSchema = require("@/src/validators/inputValidation");

const getAllItems = async (req, res, next) => {
  const date = req?.query?.date;
  const end_date = req?.query?.end_date;

  const validationProperties = [
    { name: "date", type: "string", required: true },
    { name: "end_date", type: "string", required: false },
  ];

  //* BUILD INPUT SCHEMA
  const buildedSchema = inputSchema(validationProperties);

  //* : VALIDATE INPUT DATA
  const { error } = buildedSchema.validate(
    { date, end_date },
    { abortEarly: false }
  );

  if (error) {
    return res.status(400).json({
      error: error.details.map((details) => {
        return details.message;
      }),
    });
  }

  try {
    //*: CALL AUTH SERVICE TO SEND OTP TO USERS
    const items = await riService.findAllItems({ date, end_date });

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
