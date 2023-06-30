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
const exercise_1 = __importDefault(require("../models/exercise"));
const config_1 = require("../util/config");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const systemExercises = yield exercise_1.default.find({ user: config_1.SEED_USER_ID });
    const exercises = yield exercise_1.default.find({ user: user.id });
    res.json([...exercises, ...systemExercises]);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // TODO: parse body to exercise
    const newExercise = yield exercise_1.default.create(Object.assign(Object.assign({}, req.body), { user: user.id }));
    res.json(newExercise);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const exerciseToUpdate = yield exercise_1.default.findById(req.params.id);
    if (!exerciseToUpdate) {
        return res.status(404).json({
            error: "Exercise not found",
        });
    }
    if (exerciseToUpdate.user.toString() === config_1.SEED_USER_ID) {
        return res.status(401).json({
            error: "Trying to edit system exercise",
        });
    }
    if (user.id !== exerciseToUpdate.user.toString()) {
        return res.status(401).json({
            error: "Cannot edit an exercise that is not yours!",
        });
    }
    // TODO: parse body to exercise
    const updatedExercise = yield exercise_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, context: "query" });
    res.json(updatedExercise);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const exerciseToDelete = yield exercise_1.default.findById(req.params.id);
    if (!exerciseToDelete) {
        return res.status(404).json({
            error: "Exercise not found",
        });
    }
    if (exerciseToDelete.user.toString() === config_1.SEED_USER_ID) {
        return res.status(401).json({
            error: "Trying to remove system exercise",
        });
    }
    if (user.id !== exerciseToDelete.user.toString()) {
        return res.status(401).json({
            error: "Cannot delete an exercise that is not yours!",
        });
    }
    yield exerciseToDelete.deleteOne();
    res.json(exerciseToDelete);
}));
exports.default = router;
