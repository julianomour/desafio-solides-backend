import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';
import User from '../app/models/User';
import Schedule from '../app/models/Schedule';

const models = [User, Schedule];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
