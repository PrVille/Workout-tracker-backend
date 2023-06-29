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
const { connectToDatabase } = require("./util/db");
const { userExtractor } = require("./util/middleware");
const exercisesRouter = require("./controllers/exercises");
const templatesRouter = require("./controllers/templates");
const workoutsRouter = require("./controllers/workouts");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const app = (0, express_1.default)();
let minutesSinceRefresh = 0;
node_cron_1.default.schedule("* * * * *", () => {
    console.log("minutesSinceRefresh", minutesSinceRefresh++);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/ping", (_req, res) => {
    res.send("pong");
});
app.use("/api/exercises", userExtractor, exercisesRouter);
app.use("/api/templates", userExtractor, templatesRouter);
app.use("/api/workouts", userExtractor, workoutsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    app.listen(config_1.PORT, () => {
        console.log(`App listening on port ${config_1.PORT}`);
    });
});
start();
exports.default = app;
