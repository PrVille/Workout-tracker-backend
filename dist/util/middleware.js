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
exports.userExtractor = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("./config");
const user_1 = __importDefault(require("../models/user"));
const userExtractor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try {
            const decodedToken = (0, jsonwebtoken_1.verify)(authorization.substring(7), config_1.SECRET);
            if (decodedToken) {
                ;
                request.user = (yield user_1.default.findById(decodedToken.id, { passwordHash: 0 }));
            }
        }
        catch (error) {
            return response.status(401).json({ error: "Token expired" });
        }
    }
    next();
});
exports.userExtractor = userExtractor;
