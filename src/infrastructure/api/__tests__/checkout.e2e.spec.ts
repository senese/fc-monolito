import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import request from "supertest";
import TransactionModel from "../../../modules/payment/repository/transaction.model";

let sequelize: Sequelize

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    await sequelize.addModels([TransactionModel]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should process a payment", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        orderId: "123",
        amount: 100
      });


    expect(response.status).toBe(200);
    expect(response.body.transactionId).toBeDefined();
    expect(response.body.orderId).toBe("123");
    expect(response.body.amount).toBe(100);
    expect(response.body.status).toBe("approved");
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });
});
