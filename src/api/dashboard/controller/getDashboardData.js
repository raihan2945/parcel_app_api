const dashboardService = require("@/src/lib/dashboard");
const inputSchema = require("@/src/validators/inputValidation");

const getDashboardData = async (req, res, next) => {
  const year = req?.query?.year;
  const month = req?.query?.month;

  const validationProperties = [
    { name: "year", type: "number", required: true },
    { name: "month", type: "number", required: true },
  ];

  //* BUILD INPUT SCHEMA
  const buildedSchema = inputSchema(validationProperties);

  //* : VALIDATE INPUT DATA
  const { error } = buildedSchema.validate(
    { year, month },
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
    const item = await dashboardService.getDashboardData({ year, month });

    const response = {
      code: 200,
      message: "Data get Successfully",
      data: { ...item },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = getDashboardData;
