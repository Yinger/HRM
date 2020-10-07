import { Model, DataTypes } from "sequelize";
import dbConfig from "../config/db";

export default class Department extends Model {
  public id!: number;
  public department!: string;
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    timestamps: false,
  }
);

Department.sync({ force: true }).then(() => {
  Department.create({
    id: 1,
    department: "開発",
  });
  Department.create({
    id: 2,
    department: "運用",
  });
  Department.create({
    id: 3,
    department: "テスト",
  });
  console.log("department table created");
});
