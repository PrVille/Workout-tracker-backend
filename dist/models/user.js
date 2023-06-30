"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    measurements: {
        bodyweight: {
            type: Number,
            default: 0,
        },
    },
}, { timestamps: true });
schema.set("toJSON", {
    virtuals: true,
});
const User = (0, mongoose_1.model)("User", schema);
exports.default = User;
