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
exports.refreshDemoAccount = exports.initializeSystemExercises = exports.initializeExercisesForUser = void 0;
const exercise_1 = __importDefault(require("../models/exercise"));
const workout_1 = __importDefault(require("../models/workout"));
const exercises_1 = __importDefault(require("../data/exercises"));
const config_1 = require("./config");
const types_1 = require("../types");
const randomBetween = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};
const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
const generateDate = (_year, week, day) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    startDate.setDate(startDate.getDate() - 8 * 7); // Subtracting 8 weeks from the current date
    const startDay = startDate.getDay();
    const daysToAdd = week * 7 + day - startDay;
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + daysToAdd);
    // Generate a random time within the day (0-23 hours, 0-59 minutes, 0-59 seconds)
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomSeconds = Math.floor(Math.random() * 60);
    targetDate.setHours(randomHours, randomMinutes, randomSeconds);
    return targetDate;
};
const initializeSystemExercises = () => __awaiter(void 0, void 0, void 0, function* () {
    const systemExercises = [];
    for (let index = 0; index < exercises_1.default.length; index++) {
        systemExercises.push(Object.assign(Object.assign({}, exercises_1.default[index]), { user: config_1.SEED_USER_ID }));
    }
    const res = yield exercise_1.default.insertMany(systemExercises);
    return res;
});
exports.initializeSystemExercises = initializeSystemExercises;
const initializeExercisesForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userExercises = [];
    for (let index = 0; index < 5; index++) {
        const randomExercise = exercises_1.default[randomBetween(0, exercises_1.default.length - 1)];
        userExercises.push(Object.assign(Object.assign({}, randomExercise), { user: userId }));
    }
    const res = yield exercise_1.default.insertMany(userExercises);
    return res;
});
exports.initializeExercisesForUser = initializeExercisesForUser;
const initializeLowerBodyWorkouts = (userId, count = 50) => __awaiter(void 0, void 0, void 0, function* () {
    const squat = (yield exercise_1.default.findOne({ name: "Squat (Barbell)" }));
    const deadlift = (yield exercise_1.default.findOne({
        name: "Conventional Deadlift (Barbell)",
    }));
    const calfRaises = (yield exercise_1.default.findOne({
        name: "Seated Calf Raise",
    }));
    const workouts = [];
    for (let i = 0; i < count; i++) {
        const workoutExercises = [];
        for (const exercise of [squat, deadlift]) {
            const warmupWeight = randomBetween(20, 30);
            const workingWeight = randomBetween(60, 80);
            workoutExercises.push({
                _exercise: exercise.id,
                notes: "8 - 10 reps for each working set",
                sets: [
                    {
                        type: types_1.SetType.warmup,
                        reps: randomBetween(15, 20),
                        weight: warmupWeight,
                        actualWeight: warmupWeight,
                    },
                    {
                        type: types_1.SetType.working,
                        reps: randomBetween(8, 10),
                        weight: workingWeight * 0.8,
                        actualWeight: workingWeight * 0.8,
                    },
                    {
                        type: types_1.SetType.working,
                        reps: randomBetween(8, 10),
                        weight: workingWeight * 0.9,
                        actualWeight: workingWeight * 0.9,
                    },
                    {
                        type: types_1.SetType.working,
                        reps: randomBetween(8, 10),
                        weight: workingWeight,
                        actualWeight: workingWeight,
                    },
                ],
            });
        }
        const calfRaisesWeight = randomBetween(20, 30);
        workoutExercises.push({
            _exercise: calfRaises.id,
            notes: "12 - 15 reps for each set",
            sets: [
                {
                    type: types_1.SetType.working,
                    reps: randomBetween(12, 15),
                    weight: calfRaisesWeight,
                    actualWeight: calfRaisesWeight,
                },
                {
                    type: types_1.SetType.working,
                    reps: randomBetween(12, 15),
                    weight: calfRaisesWeight + 5,
                    actualWeight: calfRaisesWeight + 5,
                },
                {
                    type: types_1.SetType.working,
                    reps: randomBetween(12, 15),
                    weight: calfRaisesWeight + 10,
                    actualWeight: calfRaisesWeight + 10,
                },
            ],
        });
        workouts.push({
            name: "Lower Body",
            user: userId,
            duration: randomBetween(45, 60),
            date: randomDate(new Date(2022, 0, 1), new Date(2023, 0, 1)),
            notes: `Workout for lower body. `,
            exercises: workoutExercises,
        });
    }
    yield workout_1.default.insertMany(workouts);
});
const initializeUpperBodyWorkouts = (userId, count = 50) => __awaiter(void 0, void 0, void 0, function* () {
    const benchPress = (yield exercise_1.default.findOne({
        name: "Bench Press (Barbell)",
    }));
    const overheadPress = (yield exercise_1.default.findOne({
        name: "Overhead Press (Barbell)",
    }));
    const bentOverRow = (yield exercise_1.default.findOne({
        name: "Bent Over Row (Barbell)",
    }));
    const hammerCurl = (yield exercise_1.default.findOne({
        name: "Hammer Curl (Dumbbell)",
    }));
    const workouts = [];
    for (let i = 0; i < count; i++) {
        const workoutExercises = [];
        for (const exercise of [benchPress, overheadPress, bentOverRow]) {
            const warmupWeight = randomBetween(20, 30);
            const workingWeight = randomBetween(40, 60);
            workoutExercises.push({
                _exercise: exercise.id,
                notes: "8 - 10 reps for each working set",
                sets: [
                    {
                        type: types_1.SetType.warmup,
                        reps: randomBetween(15, 20),
                        weight: warmupWeight,
                        actualWeight: warmupWeight,
                    },
                    {
                        type: types_1.SetType.working,
                        reps: randomBetween(8, 10),
                        weight: workingWeight * 0.8,
                        actualWeight: workingWeight * 0.8,
                    },
                    {
                        type: types_1.SetType.working,
                        reps: randomBetween(8, 10),
                        weight: workingWeight * 0.9,
                        actualWeight: workingWeight * 0.9,
                    },
                    {
                        type: types_1.SetType.working,
                        reps: randomBetween(8, 10),
                        weight: workingWeight,
                        actualWeight: workingWeight,
                    },
                ],
            });
        }
        const hammerCurlWeight = randomBetween(10, 24);
        workoutExercises.push({
            _exercise: hammerCurl.id,
            notes: "10 - 12 reps for each set",
            sets: [
                {
                    type: types_1.SetType.working,
                    reps: randomBetween(10, 12),
                    weight: hammerCurlWeight,
                    actualWeight: hammerCurlWeight,
                },
                {
                    type: types_1.SetType.working,
                    reps: randomBetween(10, 12),
                    weight: hammerCurlWeight + 2,
                    actualWeight: hammerCurlWeight + 2,
                },
                {
                    type: types_1.SetType.working,
                    reps: randomBetween(10, 12),
                    weight: hammerCurlWeight + 4,
                    actualWeight: hammerCurlWeight + 4,
                },
            ],
        });
        workouts.push({
            name: "Upper Body",
            user: userId,
            duration: randomBetween(45, 60),
            date: randomDate(new Date(2022, 0, 1), new Date(2023, 0, 1)),
            notes: `Workout for upper body. `,
            exercises: workoutExercises,
        });
    }
    yield workout_1.default.insertMany(workouts);
});
const initializeMadcow = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const squat = (yield exercise_1.default.findOne({ name: "Squat (Barbell)" }));
    const benchPress = (yield exercise_1.default.findOne({
        name: "Bench Press (Barbell)",
    }));
    const deadlift = (yield exercise_1.default.findOne({
        name: "Conventional Deadlift (Barbell)",
    }));
    const overheadPress = (yield exercise_1.default.findOne({
        name: "Overhead Press (Barbell)",
    }));
    const bentOverRow = (yield exercise_1.default.findOne({
        name: "Bent Over Row (Barbell)",
    }));
    const squatOrm = 100;
    const benchPressOrm = 80;
    const deadliftOrm = 140;
    const overheadPressOrm = 60;
    const bentOverRowOrm = 70;
    // Generate workouts
    const workouts = [];
    for (let week = 0; week < 8; week++) {
        // Workout 1
        const workout1Exercises = [
            {
                _exercise: squat.id,
                notes: "",
                sets: [
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.4 + 0.025 * week),
                        actualWeight: squatOrm * (0.4 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.5 + 0.025 * week),
                        actualWeight: squatOrm * (0.5 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.6 + 0.025 * week),
                        actualWeight: squatOrm * (0.6 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.7 + 0.025 * week),
                        actualWeight: squatOrm * (0.7 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.8 + 0.025 * week),
                        actualWeight: squatOrm * (0.8 + 0.025 * week),
                    },
                ],
            },
            {
                _exercise: benchPress.id,
                notes: "",
                sets: [
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: benchPressOrm * (0.4 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.4 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: benchPressOrm * (0.5 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.5 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: benchPressOrm * (0.6 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.6 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: benchPressOrm * (0.7 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.7 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: benchPressOrm * (0.8 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.8 + 0.025 * week),
                    },
                ],
            },
            {
                _exercise: bentOverRow.id,
                notes: "",
                sets: [
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: bentOverRowOrm * (0.4 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.4 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: bentOverRowOrm * (0.5 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.5 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: bentOverRowOrm * (0.6 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.6 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: bentOverRowOrm * (0.7 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.7 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: bentOverRowOrm * (0.8 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.8 + 0.025 * week),
                    },
                ],
            },
        ];
        const workout1 = {
            name: `Madcow 5x5, Week ${week + 1}, Workout 1`,
            user: userId,
            duration: randomBetween(45, 60),
            date: generateDate(2023, week, 1),
            notes: `Madcow 5x5, Week ${week + 1}, Workout 1. Medium Heavy`,
            exercises: workout1Exercises,
        };
        workouts.push(workout1);
        const workout2Exercises = [
            {
                _exercise: squat.id,
                notes: "",
                sets: [
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.4 + 0.025 * week),
                        actualWeight: squatOrm * (0.4 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.5 + 0.025 * week),
                        actualWeight: squatOrm * (0.5 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.6 + 0.025 * week),
                        actualWeight: squatOrm * (0.6 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.6 + 0.025 * week),
                        actualWeight: squatOrm * (0.6 + 0.025 * week),
                    },
                ],
            },
            {
                _exercise: overheadPress.id,
                notes: "",
                sets: [
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: overheadPressOrm * (0.5 + 0.025 * week),
                        actualWeight: overheadPressOrm * (0.5 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: overheadPressOrm * (0.6 + 0.025 * week),
                        actualWeight: overheadPressOrm * (0.6 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: overheadPressOrm * (0.7 + 0.025 * week),
                        actualWeight: overheadPressOrm * (0.7 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: overheadPressOrm * (0.8 + 0.025 * week),
                        actualWeight: overheadPressOrm * (0.8 + 0.025 * week),
                    },
                ],
            },
            {
                _exercise: deadlift.id,
                notes: "",
                sets: [
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: deadliftOrm * (0.5 + 0.025 * week),
                        actualWeight: deadliftOrm * (0.5 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: deadliftOrm * (0.6 + 0.025 * week),
                        actualWeight: deadliftOrm * (0.6 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: deadliftOrm * (0.7 + 0.025 * week),
                        actualWeight: deadliftOrm * (0.7 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: deadliftOrm * (0.8 + 0.025 * week),
                        actualWeight: deadliftOrm * (0.8 + 0.025 * week),
                    },
                ],
            },
        ];
        const workout2 = {
            name: `Madcow 5x5, Week ${week + 1}, Workout 2`,
            user: userId,
            duration: randomBetween(35, 50),
            date: generateDate(2023, week, 3),
            notes: `Madcow 5x5, Week ${week + 1}, Workout 2. Easy`,
            exercises: workout2Exercises,
        };
        workouts.push(workout2);
        const workout3Exercises = [
            {
                _exercise: squat.id,
                notes: "",
                sets: [
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.4 + 0.025 * week),
                        actualWeight: squatOrm * (0.4 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.5 + 0.025 * week),
                        actualWeight: squatOrm * (0.5 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.6 + 0.025 * week),
                        actualWeight: squatOrm * (0.6 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: squatOrm * (0.7 + 0.025 * week),
                        actualWeight: squatOrm * (0.7 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 3,
                        weight: squatOrm * (0.825 + 0.025 * week),
                        actualWeight: squatOrm * (0.825 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 8,
                        weight: squatOrm * (0.6 + 0.025 * week),
                        actualWeight: squatOrm * (0.6 + 0.025 * week),
                    },
                ],
            },
            {
                _exercise: benchPress.id,
                notes: "",
                sets: [
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: benchPressOrm * (0.4 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.4 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: benchPressOrm * (0.5 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.5 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: benchPressOrm * (0.6 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.6 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: benchPressOrm * (0.7 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.7 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 3,
                        weight: benchPressOrm * (0.825 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.825 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 8,
                        weight: benchPressOrm * (0.6 + 0.025 * week),
                        actualWeight: benchPressOrm * (0.6 + 0.025 * week),
                    },
                ],
            },
            {
                _exercise: bentOverRow.id,
                notes: "",
                sets: [
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: bentOverRowOrm * (0.4 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.4 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: bentOverRowOrm * (0.5 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.5 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: bentOverRowOrm * (0.6 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.6 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 5,
                        weight: bentOverRowOrm * (0.7 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.7 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 3,
                        weight: bentOverRowOrm * (0.825 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.825 + 0.025 * week),
                    },
                    {
                        type: types_1.SetType.working,
                        reps: 8,
                        weight: bentOverRowOrm * (0.6 + 0.025 * week),
                        actualWeight: bentOverRowOrm * (0.6 + 0.025 * week),
                    },
                ],
            },
        ];
        const workout3 = {
            name: `Madcow 5x5, Week ${week + 1}, Workout 3`,
            user: userId,
            duration: randomBetween(50, 70),
            date: generateDate(2023, week, 5),
            notes: `Madcow 5x5, Week ${week + 1}, Workout 3. Heavy`,
            exercises: workout3Exercises,
        };
        workouts.push(workout3);
    }
    yield workout_1.default.insertMany(workouts);
});
const refreshDemoAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    yield workout_1.default.deleteMany({ user: config_1.DEMO_USER_ID });
    yield exercise_1.default.deleteMany({ user: config_1.DEMO_USER_ID });
    yield initializeExercisesForUser(config_1.DEMO_USER_ID);
    yield initializeMadcow(config_1.DEMO_USER_ID);
    yield initializeUpperBodyWorkouts(config_1.DEMO_USER_ID);
    yield initializeLowerBodyWorkouts(config_1.DEMO_USER_ID);
    console.log("Refreshed demo acc");
});
exports.refreshDemoAccount = refreshDemoAccount;
