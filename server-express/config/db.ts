import { Sequelize } from "sequelize";

const dbConfig = new Sequelize({
  database: "hrm_db",
  dialect: "sqlite",
  storage: ":memory:",
});

export default dbConfig;
