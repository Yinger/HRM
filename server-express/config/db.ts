import { Sequelize } from "sequelize";

const dbConfig = new Sequelize({
  // database: "hrm_db",
  dialect: "sqlite",
  storage: "../db.sqlite3",
});

export default dbConfig;
