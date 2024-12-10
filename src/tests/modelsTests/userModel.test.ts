import { Sequelize, DataTypes } from "sequelize";
import User from "../../models/User";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  define: {
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
  },
});

const MockUser = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNum: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "User",
    },
  },
  {
    tableName: "users",
    modelName: "User",
  }
) as typeof User;

describe("User Model Test", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    MockUser.addHook("beforeCreate", (user) => {
        if (!user.getDataValue("role")) {
          user.setDataValue("role", "User");
        }
      });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new user", async () => {
    const user = await MockUser.create({
      email: "testuser@example.com",
      first: "Test",
      last: "User",
      passwordHash: "hashedpassword123",
      mobileNum: "1234567890",
      address: "123 Test Street",
    });

    expect(user.email).toBe("testuser@example.com");
    expect(user.first).toBe("Test");
    expect(user.last).toBe("User");
    expect(user.role).toBe("User"); // Default role
  });

  it("should create a user with a specified role", async () => {
    const adminUser = await MockUser.create({
      email: "admin@example.com",
      first: "Admin",
      last: "User",
      passwordHash: "adminpassword123",
      role: "Admin",
    });

    expect(adminUser.email).toBe("admin@example.com");
    expect(adminUser.role).toBe("Admin"); // Role explicitly set
  });
});
