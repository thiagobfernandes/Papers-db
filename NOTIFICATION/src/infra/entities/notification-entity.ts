import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";

class NotificationEntity extends Model {
  id?: number;
  emailBody: string;
  emailSubject: string;
  emailTo: string;
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

NotificationEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    emailSubject: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "email_subject",
    },

    emailBody: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "email_body",
    },

    emailTo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "email_to",
    },

    sentAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "sent_at",
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
    modelName: "NotificationEntity",
    tableName: "notifications",
    underscored: true,
    timestamps: true, 
  }
);

export default NotificationEntity;
