import request from "supertest";
import sequelize from "../config/mySQLConf";

import { app } from "../app"; // Ensure app exports the Express instance

describe.skip("GET /health", () => {
  afterAll(async () => {
    await sequelize.close(); // Close Sequelize connection
  });
  it("should return 200 OK", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "OK" });
  });
});
