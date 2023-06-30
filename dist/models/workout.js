"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    notes: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        default: 0,
    },
    exercises: [
        {
            _exercise: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Exercise",
                required: true,
            },
            notes: {
                type: String,
            },
            sets: [
                {
                    type: {
                        type: String,
                        enum: ["Warmup", "Working", "AMRAP"],
                        required: true,
                    },
                    reps: {
                        type: Number,
                        required: true,
                    },
                    weight: {
                        type: Number,
                        required: true,
                    },
                    actualWeight: {
                        type: Number,
                        required: true,
                    },
                },
            ],
        },
    ],
}, { timestamps: true });
schema.set("toJSON", {
    virtuals: true,
});
const Workout = (0, mongoose_1.model)("Workout", schema);
exports.default = Workout;
