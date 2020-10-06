import { Model, DataTypes } from "sequelize";
import dbConfig from "../config/db";
// import Department from "./Department";
// import Level from "./Level";

export default class Employee extends Model {
  public id!: number;
  public name!: string;
  public departmentId!: number;
  public hiredate!: Date;
  public levelId!: number;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
    },
    hiredate: {
      type: DataTypes.DATE,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // underscored: true,
    tableName: "employee",
    sequelize: dbConfig, // this bit is important
    timestamps: false,
  }
);

// Employee.hasMany(Department, {
//   sourceKey: "departmentId",
//   foreignKey: "id",
// });

// Employee.hasMany(Level, {
//   sourceKey: "levelId",
//   foreignKey: "id",
// });

Employee.sync({ force: true }).then(() =>
  console.log("employee table created")
);
