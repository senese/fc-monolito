import express, { Request, Response } from "express";
import Address from "../../../modules/@shared/domain/value-object/address";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";

export const clientsRoute = express.Router();

clientsRoute.post("/", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create()
  const input = {
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
    address: new Address(
      req.body.address.street,
      req.body.address.number,
      req.body.address.complement,
      req.body.address.city,
      req.body.address.state,
      req.body.address.zipCode
    ),
  };

  try {
    await clientFacade.add(input)
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});
