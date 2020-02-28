import 'dotenv/config';

module.exports = {
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
