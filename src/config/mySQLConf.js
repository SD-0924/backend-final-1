import {Sequelize} from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'mysql',
    host:'localhost',
    username: 'root',
    password: '',
    database: 'BloggingSystem',
    logging: false,
    dialectOptions: {
        charset: 'utf8mb4', 
      },
})

export default sequelize