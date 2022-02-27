import { Sequelize, DataTypes } from "@sequelize/core";
const sequelize = new Sequelize();
export const Comments = sequelize.define(
  "Comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idAuthor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authorFirstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorLastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: true,
    updatedAt: true,
  }
);
