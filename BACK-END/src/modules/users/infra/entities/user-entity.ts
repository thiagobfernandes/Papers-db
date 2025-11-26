import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/database";

class UserEntity extends Model {
  declare id: number;
  declare name: string;
  declare isMaster?: boolean;
  declare isAdmin?: boolean;
  declare username: string;
  declare email: string;
  declare password: string;
  declare cpf: string;
  declare primaryPhone: string;
  declare secondaryPhone: string;
  declare dateOfBirth: Date;
  declare genre: string;


}

UserEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "user_password",
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primaryPhone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "primary_phone",
    },
    secondaryPhone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "secondary_phone",
    },
    isMaster:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: "is_master",
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: "is_admin",
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "date_of_birth",
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, 
    },

  },
  {
    sequelize,
    modelName: "UserEntity",
    tableName: "users",
    underscored: true, 
    timestamps:false 
  }
);



export default UserEntity;
