import { Model, DataTypes } from "sequelize";
import dbConfig from "../config/db";

export default class Level extends Model {
  public id!: number;
  public level!: string;
}

Level.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    timestamps: false,
  }
);

Level.sync({ force: true }).then(() => {
  Level.create({
    id: 1,
    // levelId: 1,
    level: "level-1",
  });
  Level.create({
    id: 2,
    // levelId: 2,
    level: "level-2",
  });
  Level.create({
    id: 3,
    // levelId: 3,
    level: "level-3",
  });
  console.log("level table created");
});
