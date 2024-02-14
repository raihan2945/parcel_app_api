const { sequelize } = require("@/src/model");

const getTotalSentCount = async ({ year, month }) => {
  const data = await sequelize.query(
    `SELECT COUNT(*) FROM sents WHERE YEAR(created_at) = ${year} AND MONTH(created_at) = ${month}`
  );
  return data[0][0];
};
const getTotalLocalReceiveCount = async ({ year, month }) => {
  const data = await sequelize.query(
    `SELECT COUNT(*) FROM received_locals WHERE YEAR(created_at) = ${year} AND MONTH(created_at) = ${month}`
  );
  return data[0][0];
};
const getTotalInternationalReceiveCount = async ({ year, month }) => {
  const data = await sequelize.query(
    `SELECT COUNT(*) FROM received_internationals WHERE YEAR(created_at) = ${year} AND MONTH(created_at) = ${month}`
  );
  return data[0][0];
};

const getDashboardData = async ({ year, month }) => {
  if (!year || !month) {
    return;
  }

  const totalSent = await getTotalSentCount({ year, month });
  const totalLocalReceives = await getTotalLocalReceiveCount({ year, month });
  const totalInterNationalReceives = await getTotalInternationalReceiveCount({ year, month });

  return {
    totalSents: totalSent["COUNT(*)"],
    totalLocalReceives: totalLocalReceives["COUNT(*)"],
    totalInterNationalReceives: totalInterNationalReceives["COUNT(*)"],
  };
};

module.exports = { getDashboardData };
