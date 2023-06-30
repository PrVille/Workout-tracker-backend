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
const workout_1 = __importDefault(require("../models/workout"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const workouts = yield workout_1.default.find({
        user: user.id,
    }).populate("exercises._exercise");
    res.json(workouts);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // TODO: parse body to workout
    const newWorkout = yield workout_1.default.create(Object.assign(Object.assign({}, req.body), { user: user.id }));
    const newPopulatedWorkout = yield workout_1.default.findById(newWorkout.id).populate("exercises._exercise");
    res.json(newPopulatedWorkout);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const workoutToUpdate = yield workout_1.default.findById(req.params.id);
    if (!workoutToUpdate) {
        return res.status(404).json({
            error: "Workout not found",
        });
    }
    if (user.id !== workoutToUpdate.user.toString()) {
        return res.status(401).json({
            error: "Cannot edit an exercise that is not yours!",
        });
    }
    // TODO: parse body to workout
    const updatedWorkout = yield workout_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        context: "query",
    }).populate("exercises._exercise");
    res.json(updatedWorkout);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const workoutToDelete = yield workout_1.default.findById(req.params.id);
    if (!workoutToDelete) {
        return res.status(404).json({
            error: "Workout not found",
        });
    }
    if (user.id !== workoutToDelete.user.toString()) {
        return res.status(401).json({
            error: "Cannot delete a workout that is not yours!",
        });
    }
    yield workoutToDelete.deleteOne();
    res.json(workoutToDelete);
}));
exports.default = router;
