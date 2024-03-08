'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Company, {
        foreignKey: 'company_id',
        localKey: 'id'
      });
    }
  }
  User.init({
    id: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      // type: Sequelize.INTEGER
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName:  {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: true,
    }
  }, {
    sequelize,
    // paranoid: true, //for deleted_at
    modelName: 'User',
  });
  return User;
};
