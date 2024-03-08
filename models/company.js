'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, {
        foreignKey: 'company_id',
        localKey: 'id'
      });
    }
  }
  Company.init({
    id: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      // type: Sequelize.INTEGER
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    }
  }, {
    sequelize,
    // paranoid: true, //for deleted_at
    modelName: 'Company',
  });
  return Company;
};