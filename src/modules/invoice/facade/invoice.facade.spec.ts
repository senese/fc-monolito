import { Sequelize } from "sequelize-typescript"
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase"
import InvoiceRepository from "../repository/invoice.repository"
import InvoiceFacade from "./invoice.facade"
import InvoiceModel from "../repository/invoice.model"
import InvoiceItemModel from "../repository/invoice-items.model"
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase"
import InvoiceFacadeFactory from "../factory/invoice.facade.factory"


describe("Client Adm Facade test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should generate an invoice", async () => {

    const repository = new InvoiceRepository()
    const generateUsecase = new GenerateInvoiceUseCase(repository)
    const facade = new InvoiceFacade({
      generateUsecase: generateUsecase,
      findUsecase: undefined,
    })

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

    const invoiceId = await facade.generate(input)

    const invoice = await InvoiceModel.findOne({ where: { id: invoiceId.id }, include: [InvoiceItemModel] })

    expect(invoice.name).toEqual(input.name)
    expect(invoice.document).toEqual(input.document)
    expect(invoice.street).toEqual(input.street)
    expect(invoice.number).toEqual(input.number)
    expect(invoice.complement).toEqual(input.complement)
    expect(invoice.city).toEqual(input.city)
    expect(invoice.zipCode).toEqual(input.zipCode)
    expect(invoice.items[0].id).toEqual(input.items[0].id)
    expect(invoice.items[0].name).toEqual(input.items[0].name)
    expect(invoice.items[0].price).toEqual(input.items[0].price)
  })

  it("should find an invoice", async () => {
    const input = {
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
          id: "123",
          name: "ItemTeste",
          price: 50
        }
      ]
    }

    const facade = InvoiceFacadeFactory.create()
    const invoiceId = await facade.generate(input)

    const invoice = await facade.find({ id: invoiceId.id })

    expect(invoice.name).toEqual(input.name)
    expect(invoice.document).toEqual(input.document)
    expect(invoice.address.street).toEqual(input.street)
    expect(invoice.address.number).toEqual(input.number)
    expect(invoice.address.complement).toEqual(input.complement)
    expect(invoice.address.city).toEqual(input.city)
    expect(invoice.address.zipCode).toEqual(input.zipCode)
    expect(invoice.items[0].id).toEqual(input.items[0].id)
    expect(invoice.items[0].name).toEqual(input.items[0].name)
    expect(invoice.items[0].price).toEqual(input.items[0].price)
  })
})