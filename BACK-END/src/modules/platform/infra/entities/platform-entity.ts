import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/database";

class PlatformEntity extends Model {
  id: number;
  name: string;
  createdAt: Date;
}

PlatformEntity.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    modelName: "PlatformEntity",
    tableName: "platform",
    timestamps: false,
  }
);

export default PlatformEntity;