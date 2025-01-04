import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { app } from "../express";
import request from "supertest";

let sequelize: Sequelize

describe("E2E test for client", () => {
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    await sequelize.addModels([ClientModel]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app)
      .post("/clients")
      .send({
        name: "John",
        email: "john@doe.com",
        document: "123",
        address: {
          street: "Street",
          number: "123",
          complement: "A",
          city: "City",
          state: "State",
          zipCode: "12345",
        },
      });

    const client = await ClientModel.findAll()

    expect(response.status).toBe(200);
    expect(client[0].id).toBeDefined();
    expect(client[0].name).toBe("John");
    expect(client[0].email).toBe("john@doe.com");
    expect(client[0].document).toBe("123");
    expect(client[0].street).toBe("Street");
    expect(client[0].number).toBe("123");
    expect(client[0].complement).toBe("A");
    expect(client[0].city).toBe("City");
    expect(client[0].state).toBe("State");
    expect(client[0].zipcode).toBe("12345");


  });
});
