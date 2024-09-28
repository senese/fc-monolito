import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-items.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/invoice";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItem from "../domain/invoice-item";
import Id from "../../@shared/domain/value-object/id.value-object";

const invoiceProps = {
  id: new Id("1"),
  name: "Test Invoice",
  document: "Document",
  address: new Address(
    "Rua Teste",
    "123",
    "Bloco VSCode",
    "Sao Paulo",
    "SP",
    "00000-000"
  ),
  items: [new InvoiceItem("ItemTeste", 50, "123")],
};

describe("Invoice Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an invoice", async () => {
    const invoiceRepository = new InvoiceRepository();
    const invoice = new Invoice(invoiceProps);

    await invoiceRepository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({ where: { id: "1" }, include: [InvoiceItemModel]  });

    expect(invoiceDb).toBeDefined();
    expect(invoiceDb.id).toEqual(invoice.id.id);
    expect(invoiceDb.name).toEqual(invoice.name);
    expect(invoiceDb.document).toEqual(invoice.document);
    expect(invoiceDb.street).toEqual(invoice.address.street);
    expect(invoiceDb.number).toEqual(invoice.address.number);
    expect(invoiceDb.complement).toEqual(invoice.address.complement);
    expect(invoiceDb.city).toEqual(invoice.address.city);
    expect(invoiceDb.state).toEqual(invoice.address.state);
    expect(invoiceDb.items[0].id).toEqual(invoice.items[0].id.id);
    expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name);
    expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price);
    expect(invoiceDb.zipCode).toEqual(invoice.address.zipCode);
    expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt);
    expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt);
  });

  it("should find an invoice", async () => {
    const invoiceDb = await InvoiceModel.create(
      {
        id: "1",
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
            name: "ItemTeste",
            price: 50,
            id: "123",
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: [InvoiceItemModel] }
    );
    const invoiceRepository = new InvoiceRepository();
    const result = await invoiceRepository.find(invoiceDb.id);

    expect(result).toBeDefined();
    expect(result.id.id).toEqual(invoiceDb.id);
    expect(result.name).toEqual(invoiceDb.name);
    expect(result.document).toEqual(result.document);
    expect(result.address.street).toEqual(invoiceDb.street);
    expect(result.address.number).toEqual(invoiceDb.number);
    expect(result.address.complement).toEqual(invoiceDb.complement);
    expect(result.address.city).toEqual(invoiceDb.city);
    expect(result.address.state).toEqual(invoiceDb.state);
    expect(result.address.zipCode).toEqual(invoiceDb.zipCode);
    expect(result.items[0].name).toEqual(invoiceDb.items[0].name)
    expect(result.items[0].price).toEqual(invoiceDb.items[0].price)
    expect(result.items[0].id.id).toEqual(invoiceDb.items[0].id)
  });
});
