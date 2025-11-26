import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/database";
import UserEntity from "../../../users/infra/entities/user-entity";
import PlatformEntity from "../../../platform/infra/entities/platform-entity";

class PapersEntity extends Model {
  id?: number;
  title: string;
  language: string;
  userId: number;
  platformId: number;
  createdAt: Date;
  user?: UserEntity;
  platform?: PlatformEntity;
  documentPath?: string;

}



PapersEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserEntity,
        key: "id",
      },
      field: "user_id",
    },
    platformId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "platform_id",
    },
    documentPath: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "document_path",
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
    modelName: "PapersEntity",
    tableName: "papers",
    underscored: true,
    timestamps: false,
  }
);

PapersEntity.belongsTo(UserEntity, {
  foreignKey: "userId",
  as: "user",
});
UserEntity.hasMany(PapersEntity, {
  foreignKey: "userId",
  as: "papers",
});




export default PapersEntity;
