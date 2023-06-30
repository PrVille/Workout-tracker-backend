"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = require("mongoose");
const workout_1 = __importDefault(require("./workout"));
const types = __importStar(require("../types"));
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
    videoId: {
        type: String,
    },
    muscleGroups: [
        {
            type: String,
            enum: Object.values(types.MuscleGroup),
            required: true,
        },
    ],
    equipment: {
        type: String,
        enum: Object.values(types.Equipment),
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(types.ExerciseType),
        required: true,
    },
    bodyweightFactor: {
        type: Number,
        default: 100,
        min: 0,
        max: 100,
    },
});
schema.set("toJSON", {
    virtuals: true,
});
schema.pre("deleteOne", { document: true, query: false }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const exercise = JSON.parse(JSON.stringify(this));
        // Remove deleted exercise from workouts
        yield workout_1.default.updateMany({ "exercises._exercise": exercise.id }, {
            $pull: {
                exercises: { _exercise: exercise.id },
            },
        });
        // Delete workouts with no exercises
        yield workout_1.default.deleteMany({
            "exercises.0": { $exists: false },
        });
        next();
    });
});
const Exercise = (0, mongoose_1.model)("Exercise", schema);
exports.default = Exercise;
