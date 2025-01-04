import { Umzug } from "umzug";
import { migrator } from "../../migrator/migrator";
import request from "supertest";
import { Sequelize } from "sequelize-typescript";
import { ProductModel as ProductAdmModel} from "../../../modules/product-adm/repository/product.model";
import ProductModel from "../../../modules/store-catalog/repository/product.model";
import { app } from "../express";

// let sequelize: Sequelize

describe("E2E test for products", () => {
  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false
    });
    
    // Initialize models
    await sequelize.addModels([ProductModel, ProductAdmModel]);
    
    // Run migrations
    migration = migrator(sequelize);
    await migration.up();
  });

  afterEach(async () => {
    if (migration) {
      await migration.down();
    }
    await sequelize.close();
  });

  it("should create a product", async () => {
    try {
      const response = await request(app)
        .post("/products")
        .send({
          name: "Product",
          description: "A Product",
          purchasePrice: 100,
          stock: 10,
        });

      const products = await ProductAdmModel.findAll();
      
      expect(response.status).toBe(200);
      expect(products).toHaveLength(1);
      expect(products[0].id).toBeDefined();
      expect(products[0].name).toBe("Product");
      expect(products[0].description).toBe("A Product");
      expect(products[0].purchasePrice).toBe(100);
      expect(products[0].stock).toBe(10);
    } catch (error) {
      console.error('Test error:', error);
      throw error;
    }
  });
});
