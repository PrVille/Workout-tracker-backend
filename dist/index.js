"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
require("express-async-errors");
const config_1 = require("./util/config");
const db_1 = require("./util/db");
const middleware_1 = require("./util/middleware");
const exercises_1 = __importDefault(require("./controllers/exercises"));
const workouts_1 = __importDefault(require("./controllers/workouts"));
const statistics_1 = __importDefault(require("./controllers/statistics"));
const users_1 = __importDefault(require("./controllers/users"));
const login_1 = __importDefault(require("./controllers/login"));
const initializeDb_1 = require("./util/initializeDb");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, initializeDb_1.refreshDemoAccount)();
        console.log("refreshDemoAccount");
    }
    catch (error) {
        console.error('Error refreshing demo account:', error);
    }
}));
app.get("/ping", (_req, res) => {
    res.send("pong");
});
app.use("/api/exercises", middleware_1.userExtractor, exercises_1.default);
app.use("/api/workouts", middleware_1.userExtractor, workouts_1.default);
app.use("/api/statistics", statistics_1.default);
app.use("/api/users", users_1.default);
app.use("/api/login", login_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectToDatabase)();
    app.listen(config_1.PORT, () => {
        console.log(`App listening on port ${config_1.PORT}`);
    });
});
start();
exports.default = app;
