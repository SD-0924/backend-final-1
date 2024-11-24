"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hello, TypeScript!");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mySQLConf_1 = __importDefault(require("./config/mySQLConf"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use("/api/auth", userRoutes_1.default);
// Start the server
const PORT = process.env.PORT || 5000;
mySQLConf_1.default.sync({ force: false }).then(() => {
    console.log("Database connected and tables synchronized");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
