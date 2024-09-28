import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn()
  }
}

describe("Generate invoice use case unit test", () => {
  it("should generate an invoice", async () => {
    const repository = MockRepository()
    const usecase = new GenerateInvoiceUseCase(repository)

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

    const result = await usecase.execute(input)

    expect(repository.generate).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.document).toEqual(input.document)
    expect(result.street).toEqual(input.street)
    expect(result.number).toEqual(input.number)
    expect(result.complement).toEqual(input.complement)
    expect(result.city).toEqual(input.city)
    expect(result.zipCode).toEqual(input.zipCode)
    expect(result.items[0].id).toEqual(input.items[0].id)
    expect(result.items[0].name).toEqual(input.items[0].name)
    expect(result.items[0].price).toEqual(input.items[0].price)
    expect(result.total).toEqual(50)
  })

  it("should generate an invoice with two items", async () => {
    const repository = MockRepository()
    const usecase = new GenerateInvoiceUseCase(repository)

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
        },
        {
          id: "123",
          name: "ItemTeste",
          price: 100
        }
      ]
    }

    const result = await usecase.execute(input)

    expect(repository.generate).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.document).toEqual(input.document)
    expect(result.street).toEqual(input.street)
    expect(result.number).toEqual(input.number)
    expect(result.complement).toEqual(input.complement)
    expect(result.city).toEqual(input.city)
    expect(result.zipCode).toEqual(input.zipCode)
    expect(result.items[0].id).toEqual(input.items[0].id)
    expect(result.items[0].name).toEqual(input.items[0].name)
    expect(result.items[0].price).toEqual(input.items[0].price)
    expect(result.total).toEqual(150)
  })
})