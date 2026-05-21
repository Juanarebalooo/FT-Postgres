import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";
export class Product extends Model {}
Product.init(
  {
    price: DataTypes.INTEGER,
    title: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "product",
  },
);
