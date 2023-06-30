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
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const workout_1 = __importDefault(require("../models/workout"));
const exercise_1 = __importDefault(require("../models/exercise"));
const middleware_1 = require("../util/middleware");
const config_1 = require("../util/config");
const router = express_1.default.Router();
router.get("/username/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.default.findOne({ username: req.params.username }, { username: 1 });
    res.json(existingUser);
}));
router.get("/email/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.default.findOne({ email: req.params.email }, { email: 1 });
    res.json(existingUser);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: parse body to new user, validate pw
    const { email, username, password } = req.body;
    const existingEmail = yield user_1.default.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({
            error: "Email already exists!",
        });
    }
    const existingUsername = yield user_1.default.findOne({ username });
    if (existingUsername) {
        return res.status(400).json({
            error: "Username already exists!",
        });
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    const newUser = yield user_1.default.create({
        email,
        username,
        passwordHash,
    });
    const createdUser = yield user_1.default.findById(newUser.id, { passwordHash: 0 });
    res.json(createdUser);
}));
router.put("/:id", middleware_1.userExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user.id !== req.params.id) {
        return res.status(401).json({
            error: "Cannot update other user!",
        });
    }
    if (req.params.id === config_1.SEED_USER_ID) {
        return res.status(401).json({
            error: "Trying to edit seed user!",
        });
    }
    if (req.params.id === config_1.DEMO_USER_ID) {
        return res.status(401).json({
            error: "Cannot edit demo user!",
        });
    }
    // TODO: parse body to user
    const updatedUser = yield user_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        context: "query",
        select: { passwordHash: 0 },
    });
    if (!updatedUser) {
        return res.status(404).json({
            error: "User not found",
        });
    }
    res.json(Object.assign(Object.assign({}, updatedUser.toJSON()), { token: req.body.token }));
}));
router.put("/:id/password", middleware_1.userExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user.id !== req.params.id) {
        return res.status(401).json({
            error: "Cannot update other user!",
        });
    }
    if (req.params.id === config_1.SEED_USER_ID) {
        return res.status(401).json({
            error: "Trying to edit seed user!",
        });
    }
    if (req.params.id === config_1.DEMO_USER_ID) {
        return res.status(401).json({
            error: "Cannot edit demo user!",
        });
    }
    // TODO: parse pw
    const newPassword = req.body.password;
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(newPassword, saltRounds);
    yield user_1.default.findByIdAndUpdate(req.params.id, { passwordHash }, {
        new: true,
        runValidators: true,
        context: "query",
        select: { passwordHash: 0 },
    });
    res.json({ message: "Success" });
}));
router.delete("/:id", middleware_1.userExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user.id !== req.params.id) {
        return res.status(401).json({
            error: "Cannot delete other user!",
        });
    }
    if (req.params.id === config_1.SEED_USER_ID) {
        return res.status(401).json({
            error: "Trying to remove seed user",
        });
    }
    if (req.params.id === config_1.DEMO_USER_ID) {
        return res.status(401).json({
            error: "Cannot delete demo user!",
        });
    }
    const userToDelete = yield user_1.default.findById(req.params.id);
    if (!userToDelete) {
        return res.status(404).json({
            error: "User not found",
        });
    }
    yield workout_1.default.deleteMany({ user: userToDelete.id });
    yield exercise_1.default.deleteMany({ user: userToDelete.id });
    yield userToDelete.deleteOne();
    res.json(userToDelete);
}));
exports.default = router;
