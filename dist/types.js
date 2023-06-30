"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetType = exports.MuscleGroup = exports.Equipment = exports.ExerciseType = void 0;
var ExerciseType;
(function (ExerciseType) {
    ExerciseType["repsAndKg"] = "Reps&Kg";
    ExerciseType["repsAndBw"] = "Reps&Bw";
    ExerciseType["repsAndPlusKg"] = "Reps&+Kg";
    ExerciseType["repsAndMinusKg"] = "Reps&-Kg";
})(ExerciseType || (exports.ExerciseType = ExerciseType = {}));
var Equipment;
(function (Equipment) {
    Equipment["barbell"] = "Barbell";
    Equipment["dumbbell"] = "Dumbbell";
    Equipment["kettlebell"] = "Kettlebell";
    Equipment["machine"] = "Machine";
    Equipment["plate"] = "Plate";
    Equipment["band"] = "Band";
    Equipment["none"] = "None";
    Equipment["other"] = "Other";
})(Equipment || (exports.Equipment = Equipment = {}));
var MuscleGroup;
(function (MuscleGroup) {
    MuscleGroup["chest"] = "Chest";
    MuscleGroup["delts"] = "Delts";
    MuscleGroup["quads"] = "Quads";
    MuscleGroup["glutes"] = "Glutes";
    MuscleGroup["hamstrings"] = "Hamstrings";
    MuscleGroup["upperBack"] = "Upper Back";
    MuscleGroup["lats"] = "Lats";
    MuscleGroup["biceps"] = "Biceps";
    MuscleGroup["triceps"] = "Triceps";
    MuscleGroup["calves"] = "Calves";
    MuscleGroup["abs"] = "Abs";
})(MuscleGroup || (exports.MuscleGroup = MuscleGroup = {}));
var SetType;
(function (SetType) {
    SetType["warmup"] = "Warmup";
    SetType["working"] = "Working";
    SetType["amrap"] = "AMRAP";
})(SetType || (exports.SetType = SetType = {}));
