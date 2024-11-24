import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.DB_LOGGING === "true",
  dialectOptions: {
    charset: process.env.DB_CHARSET,
  },
});

export default sequelize;
