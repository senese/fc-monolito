import express, { Request, Response } from "express";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const paymentFacade = PaymentFacadeFactory.create()
  const input = {
    orderId: req.body.orderId,
    amount: req.body.amount
  };

  try {
    const output = await paymentFacade.process(input)
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
