import { STATUS_CODES } from "../../constants/statusCodes";
import request from "supertest";
import sequelize from "../../config/mySQLConf";

import app from "../../app"; // Ensure app exports the Express instance

describe("GET /health", () => {
  afterAll(async () => {
    await sequelize.close(); // Close Sequelize connection
  });
  it("should return STATUS_CODES.CREATED OK", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body).toEqual({ status: "OK" });
  });
});
