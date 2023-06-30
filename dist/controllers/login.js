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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const typeParsers_1 = require("../typeParsers");
const config_1 = require("../util/config");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = (0, typeParsers_1.parseCredentials)(req.body);
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.status(401).json({
            error: "Invalid email",
        });
    }
    const passwordCorrect = yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!passwordCorrect) {
        return res.status(401).json({
            error: "Invalid password",
        });
    }
    const userForToken = {
        id: user.id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
    });
    res.json({
        token,
        username: user.username,
        email: user.email,
        id: user.id,
        measurements: user.measurements,
    });
}));
exports.default = router;
