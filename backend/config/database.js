//Connexion à la bdd
const { Sequelize, DataTypes } = require("sequelize");
const Comments = require("../models/Comments.js");
const Likes = require("../models/Likes.js");
const Posts = require("../models/Posts.js");
const Roles = require("../models/Roles.js");
const Users = require("../models/Users.js");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mariadb",
    port: process.env.PORT,
    logging: false,
  }
);

const commentsModel = Comments(sequelize, DataTypes);
const likesModel = Likes(sequelize, DataTypes);
const postsModel = Posts(sequelize, DataTypes);
const rolesModel = Roles(sequelize, DataTypes);
const usersModel = Users(sequelize, DataTypes);

function connectToDatabase(err) {
  if (err) {
    console.error(err);
  } else {
    sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
  }
}

function sync(err) {
  if (err) {
    console.log(err);
  } else {
    sequelize.sync().then(() => console.log("Synchronization was successful"));
  }
}

module.exports = { connectToDatabase, sync };
