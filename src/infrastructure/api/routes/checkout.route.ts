import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const paymentFacade = PaymentFacadeFactory.create()
  const input = {
    name: req.body.name,
    description: req.body.description,
    purchasePrice: req.body.purchasePrice,
    stock: req.body.stock
  };

  try {
    await paymentFacade.process()
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});
