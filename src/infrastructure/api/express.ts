import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { clientsRoute } from "./routes/clients.route";
import { productsRoute } from "./routes/products.route";
import { checkoutRoute } from "./routes/checkout.route";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel as ProductAdmModel } from "../../modules/product-adm/repository/product.model";
import ProductModel from "../../modules/store-catalog/repository/product.model";

export const app: Express = express();
app.use(express.json());
app.use("/clients", clientsRoute);
app.use("/products", productsRoute);
app.use("/checkout", checkoutRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ClientModel, ProductAdmModel, ProductModel]);
  await sequelize.sync();
}
setupDb();
