import { Model, DataTypes } from "sequelize";
import dbConfig from "../config/db";

export class Level extends Model {
  public id!: number;
  public level!: string;
}

Level.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    level: {
      type: DataTypes.STRING(128),
    },
  },
  {
    // underscored: true,
    tableName: "level",
    sequelize: dbConfig, // this bit is important
  }
);

Level.sync({ force: true }).then(() => console.log("level table created"));
