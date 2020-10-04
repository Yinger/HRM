import { Model, DataTypes } from "sequelize";
import dbConfig from "../config/db";

export class Department extends Model {
  public id!: number;
  public department!: string;
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    department: {
      type: DataTypes.STRING(128),
    },
  },
  {
    // underscored: true,
    tableName: "department",
    sequelize: dbConfig, // this bit is important
  }
);

Department.sync({ force: true }).then(() =>
  console.log("department table created")
);
