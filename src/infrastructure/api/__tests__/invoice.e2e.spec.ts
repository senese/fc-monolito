import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import request from "supertest";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../../modules/invoice/repository/invoice-items.model";

let sequelize: Sequelize

describe("E2E test for invoice", () => {
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should find an invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create()
    const input = {
      name: "Test Invoice",
      document: "Document",
      street: "Rua Teste",
      number: "123",
      complement: "Bloco VSCode",
      city: "Sao Paulo",
      state: "SP",
      zipCode: "00000-000",
      items: [
        {
          id: "123",
          name: "ItemTeste",
          price: 50
        }
      ]
    }
    const output = await invoiceFacade.generate(input);

    const response = await request(app).get(`/invoice/${output.id}`)

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toEqual(input.name)
    expect(response.body.document).toEqual(input.document)
    expect(response.body.address.street).toEqual(input.street)
    expect(response.body.address.number).toEqual(input.number)
    expect(response.body.address.complement).toEqual(input.complement)
    expect(response.body.address.city).toEqual(input.city)
    expect(response.body.address.zipCode).toEqual(input.zipCode)
    expect(response.body.items[0].id).toEqual(input.items[0].id)
    expect(response.body.items[0].name).toEqual(input.items[0].name)
    expect(response.body.items[0].price).toEqual(input.items[0].price)
    expect(response.body.total).toEqual(50)
  });
});
