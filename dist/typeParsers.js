"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCredentials = exports.parseString = void 0;
const typeGuards_1 = require("./typeGuards");
const parseString = (value, what) => {
    if (!value || !(0, typeGuards_1.isString)(value)) {
        throw new Error(`Value of ${what} incorrect: ${value}`);
    }
    return value;
};
exports.parseString = parseString;
const parseCredentials = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Data missing or in wrong format");
    }
    if (!("email" in object))
        throw new Error("type missing");
    if (!("password" in object))
        throw new Error("date missing");
    const credentials = {
        email: (0, exports.parseString)(object.email, "email"),
        password: (0, exports.parseString)(object.password, "password"),
    };
    return credentials;
};
exports.parseCredentials = parseCredentials;
