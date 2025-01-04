import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
  const productsAdmFacade = ProductAdmFacadeFactory.create()
  const inputProductAdm = {
    name: req.body.name,
    description: req.body.description,
    purchasePrice: req.body.purchasePrice,
    stock: req.body.stock
  };

  try {
    await productsAdmFacade.addProduct(inputProductAdm)
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});
