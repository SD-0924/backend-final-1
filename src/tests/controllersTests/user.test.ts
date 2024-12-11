import request from "supertest";
import app from "../../app"; // Adjust to your app's location
import * as userService from "../../services/userService"; // Mock service

jest.mock("../../services/userService.ts");

describe("User Controller", () => {
  const testUser = {
    email: "test@example.com",
    first: "John",
    last: "Doe",
    password: "password123",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("should register a user successfully", async () => {
      const mockServiceResponse = { id: "123", ...testUser };
      (userService.registerUser as jest.Mock).mockResolvedValue(mockServiceResponse);

      const response = await request(app)
        .post("/register")
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "User registered successfully",
        user: expect.objectContaining({
          id: "123",
          email: testUser.email,
        }),
      });
      expect(userService.registerUser).toHaveBeenCalledWith(testUser);
    });

    it("should return 500 if email is already registered", async () => {
      (userService.registerUser as jest.Mock).mockRejectedValue(new Error("Email is already registered"));

      const response = await request(app)
        .post("/register")
        .send(testUser);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Email is already registered",
        message: "Internal server error",
      });
      expect(userService.registerUser).toHaveBeenCalledWith(testUser);
    });
  });

  describe("POST /login", () => {
    it("should login a user successfully", async () => {
      const mockServiceResponse = { id: "123", token: "mocked-jwt-token" };
      (userService.verifyPassword as jest.Mock).mockResolvedValue(mockServiceResponse);
    
      const response = await request(app)
        .post("/login")
        .send({ email: testUser.email, password: testUser.password });
    
      console.log("Response status:", response.status);
      console.log("Response body:", response.body);
    
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Login successful",
        id: "123",
        token: expect.any(String),
      });
      expect(userService.verifyPassword).toHaveBeenCalledWith(testUser.email, testUser.password);
    });
    

    it("should return 401 for invalid credentials", async () => {
      (userService.verifyPassword as jest.Mock).mockRejectedValue(new Error("Invalid password"));

      const response = await request(app)
        .post("/login")
        .send({ email: testUser.email, password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: "Invalid password" });
      expect(userService.verifyPassword).toHaveBeenCalledWith(testUser.email, "wrongpassword");
    });
  });
});
