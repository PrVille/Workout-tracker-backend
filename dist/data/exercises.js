"use strict";
// Muscle groups does not count indirect biceps/triceps volume
// Warmup sets does not count in metrics
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const exercises = [
    {
        name: "Squat (Barbell)",
        muscleGroups: [types_1.MuscleGroup.quads, types_1.MuscleGroup.glutes],
        equipment: types_1.Equipment.barbell,
        videoId: "bEv6CCg2BC8",
        type: types_1.ExerciseType.repsAndKg
    },
    {
        name: "Bench Press (Barbell)",
        muscleGroups: [types_1.MuscleGroup.chest, types_1.MuscleGroup.delts],
        equipment: types_1.Equipment.barbell,
        videoId: "vcBig73ojpE",
        type: types_1.ExerciseType.repsAndKg
    },
    {
        name: "Sumo Deadlift (Barbell)",
        muscleGroups: [types_1.MuscleGroup.glutes, types_1.MuscleGroup.hamstrings, types_1.MuscleGroup.quads],
        equipment: types_1.Equipment.barbell,
        videoId: "XsrD5y8EIKU",
        type: types_1.ExerciseType.repsAndKg
    },
    {
        name: "Conventional Deadlift (Barbell)",
        muscleGroups: [types_1.MuscleGroup.glutes, types_1.MuscleGroup.hamstrings, types_1.MuscleGroup.quads],
        equipment: types_1.Equipment.barbell,
        videoId: "VL5Ab0T07e4",
        type: types_1.ExerciseType.repsAndKg
    },
    {
        name: "Overhead Press (Barbell)",
        muscleGroups: [types_1.MuscleGroup.delts],
        equipment: types_1.Equipment.barbell,
        videoId: "_RlRDWO2jfg",
        type: types_1.ExerciseType.repsAndKg
    },
    {
        name: "Bent Over Row (Barbell)",
        muscleGroups: [types_1.MuscleGroup.upperBack],
        equipment: types_1.Equipment.barbell,
        videoId: "",
        type: types_1.ExerciseType.repsAndKg
    },
    {
        name: "Pull Up",
        muscleGroups: [types_1.MuscleGroup.lats],
        equipment: types_1.Equipment.machine,
        videoId: "Hdc7Mw6BIEE",
        type: types_1.ExerciseType.repsAndBw
    },
    {
        name: "Pull Up (Assisted)",
        muscleGroups: [types_1.MuscleGroup.lats],
        equipment: types_1.Equipment.machine,
        videoId: "Hdc7Mw6BIEE",
        type: types_1.ExerciseType.repsAndMinusKg
    },
    {
        name: "Pull Up (Weighted)",
        muscleGroups: [types_1.MuscleGroup.lats],
        equipment: types_1.Equipment.machine,
        videoId: "Hdc7Mw6BIEE",
        type: types_1.ExerciseType.repsAndPlusKg
    },
    {
        name: "Hammer Curl (Dumbbell)",
        muscleGroups: [types_1.MuscleGroup.biceps],
        equipment: types_1.Equipment.dumbbell,
        videoId: "OPqe0kCxmR8",
        type: types_1.ExerciseType.repsAndKg
    },
    {
        name: "Triceps Pushdown",
        muscleGroups: [types_1.MuscleGroup.triceps],
        equipment: types_1.Equipment.machine,
        videoId: "94DXwlcX8Po",
        type: types_1.ExerciseType.repsAndKg
    },
    {
        name: "Seated Calf Raise",
        muscleGroups: [types_1.MuscleGroup.calves],
        equipment: types_1.Equipment.machine,
        videoId: "-qsRtp_PbVM?start=311",
        type: types_1.ExerciseType.repsAndKg
    },
    {
        name: "Crunch",
        muscleGroups: [types_1.MuscleGroup.abs],
        equipment: types_1.Equipment.none,
        videoId: "",
        type: types_1.ExerciseType.repsAndBw,
        bodyweightFactor: 50
    },
    // {
    //   name: "Standing Military Press",
    //   orm: 0,
    //   muscleGroups: ["shoulders"],
    //   secondaryMuscles: [MuscleGroup.triceps],
    //   equipment: [Equipment.barbell],
    // },
    // {
    //   name: "Pull-ups",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.lats, MuscleGroup.biceps],
    //   secondaryMuscles: ["forearms"],
    //   equipment: ["none"],
    // },
    // {
    //   name: "Dumbbell Rows",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.lats],
    //   secondaryMuscles: [MuscleGroup.biceps],
    //   equipment: [Equipment.dumbbell],
    // },
    // {
    //   name: "Calf Raises",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.calves],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Leg Press",
    //   orm: 0,
    //   muscleGroups: ["quadriceps", MuscleGroup.hamstrings, MuscleGroup.glutes],
    //   secondaryMuscles: [MuscleGroup.calves],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Dumbbell Curl",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.biceps],
    //   secondaryMuscles: ["forearms"],
    //   equipment: [Equipment.dumbbell],
    // },
    // {
    //   name: "Tricep Pushdown",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.triceps],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Plank",
    //   orm: 0,
    //   muscleGroups: ["abdominals"],
    //   secondaryMuscles: ["lower back"],
    //   equipment: ["none"],
    // },
    // {
    //   name: "Hip Thrust",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.glutes],
    //   secondaryMuscles: [MuscleGroup.hamstrings],
    //   equipment: [Equipment.barbell],
    // },
    // {
    //   name: "Lat Pulldown",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.lats],
    //   secondaryMuscles: [MuscleGroup.biceps],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Leg Extension",
    //   orm: 0,
    //   muscleGroups: ["quadriceps"],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Seated Cable Row",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.lats],
    //   secondaryMuscles: [MuscleGroup.biceps],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Push-ups",
    //   orm: 0,
    //   muscleGroups: ["chest", MuscleGroup.triceps],
    //   secondaryMuscles: ["shoulders"],
    //   equipment: ["none"],
    // },
    // {
    //   name: "Romanian Deadlift",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.hamstrings, MuscleGroup.glutes],
    //   secondaryMuscles: ["lower back"],
    //   equipment: [Equipment.barbell],
    // },
    // {
    //   name: "Incline Bench Press",
    //   orm: 0,
    //   muscleGroups: ["upper chest", "front delts", MuscleGroup.triceps],
    //   secondaryMuscles: ["lower chest"],
    //   equipment: [Equipment.barbell],
    // },
    // {
    //   name: "Dumbbell Fly",
    //   orm: 0,
    //   muscleGroups: ["chest"],
    //   secondaryMuscles: ["front delts"],
    //   equipment: [Equipment.dumbbell],
    // },
    // {
    //   name: "Hammer Curl",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.biceps],
    //   secondaryMuscles: ["forearms"],
    //   equipment: [Equipment.dumbbell],
    // },
    // {
    //   name: "Lateral Raise",
    //   orm: 0,
    //   muscleGroups: ["shoulders"],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.dumbbell],
    // },
    // {
    //   name: "Seated Leg Curl",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.hamstrings],
    //   secondaryMuscles: [MuscleGroup.glutes],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Reverse Fly",
    //   orm: 0,
    //   muscleGroups: ["rear delts"],
    //   secondaryMuscles: [MuscleGroup.upperBack],
    //   equipment: [Equipment.dumbbell],
    // },
    // {
    //   name: "Barbell Shrug",
    //   orm: 0,
    //   muscleGroups: ["traps"],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.barbell],
    // },
    // {
    //   name: "Leg Press Calf Raise",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.calves],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Standing Calf Raise",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.calves],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Dumbbell Pullover",
    //   orm: 0,
    //   muscleGroups: ["chest"],
    //   secondaryMuscles: [MuscleGroup.lats],
    //   equipment: [Equipment.dumbbell],
    // },
    // {
    //   name: "Overhead Tricep Extension",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.triceps],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.dumbbell],
    // },
    // {
    //   name: "Abdominal Crunch",
    //   orm: 0,
    //   muscleGroups: ["abdominals"],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Russian Twist",
    //   orm: 0,
    //   muscleGroups: ["obliques"],
    //   secondaryMuscles: ["abdominals"],
    //   equipment: ["none"],
    // },
    // {
    //   name: "Leg Extension",
    //   orm: 0,
    //   muscleGroups: ["quadriceps"],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Close-Grip Bench Press",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.triceps],
    //   secondaryMuscles: ["chest"],
    //   equipment: [Equipment.barbell],
    // },
    // {
    //   name: "Wide-Grip Lat Pulldown",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.lats],
    //   secondaryMuscles: [MuscleGroup.biceps],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Standing Barbell Curl",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.biceps],
    //   secondaryMuscles: ["forearms"],
    //   equipment: [Equipment.barbell],
    // },
    // {
    //   name: "Standing Military Press",
    //   orm: 0,
    //   muscleGroups: ["shoulders"],
    //   secondaryMuscles: [MuscleGroup.triceps],
    //   equipment: [Equipment.barbell],
    // },
    // {
    //   name: "Dumbbell Bench Press",
    //   orm: 0,
    //   muscleGroups: ["chest"],
    //   secondaryMuscles: ["front delts", MuscleGroup.triceps],
    //   equipment: [Equipment.dumbbell],
    // },
    // {
    //   name: "Barbell Deadlift",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.hamstrings, MuscleGroup.glutes, "lower back"],
    //   secondaryMuscles: ["forearms"],
    //   equipment: [Equipment.barbell],
    // },
    // {
    //   name: "Hammer Strength Chest Press",
    //   orm: 0,
    //   muscleGroups: ["chest"],
    //   secondaryMuscles: ["front delts", MuscleGroup.triceps],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Triceps Pushdown",
    //   orm: 0,
    //   muscleGroups: [MuscleGroup.triceps],
    //   secondaryMuscles: ["none"],
    //   equipment: [Equipment.machine],
    // },
    // {
    //   name: "Seated Dumbbell Shoulder Press",
    //   orm: 0,
    //   muscleGroups: ["shoulders"],
    //   secondaryMuscles: [MuscleGroup.triceps],
    //   equipment: [Equipment.dumbbell],
    // },
];
exports.default = exercises;
