import { Model, DataTypes } from "sequelize";
import dbConfig from "../config/db";
// import moment from "moment";

export default class Employee extends Model {
  public id!: number;
  public name!: string;
  public departmentId!: number;
  public hiredate!: Date;
  public levelId!: number;
}

// export interface EmployeeInterface {
//   id: number;
//   name: string;
//   hiredate: string;
//   department: string;
//   departmentId: number;
//   level: string;
//   levelId: number;
// }

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
      type: DataTypes.DATEONLY,
      // get: function () {
      //   return moment.utc(this.getDataValue("hiredate")).format("YYYY/MM/DD");
      // },
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

Employee.sync({ force: true }).then(() => {
  Employee.create({
    id: 1,
    name: "地域三郎",
    hiredate: new Date("2010/05/04"),
    departmentId: 1,
    levelId: 3,
  });

  Employee.create({
    id: 2,
    name: "田中",
    hiredate: new Date("2015/07/01"),
    departmentId: 2,
    levelId: 2,
  });

  Employee.create({
    id: 3,
    name: "森",
    hiredate: new Date("2020/07/01"),
    departmentId: 3,
    levelId: 1,
  });
  console.log("employee table created");
});
