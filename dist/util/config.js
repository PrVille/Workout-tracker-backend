"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEMO_USER_ID = exports.SEED_USER_ID = exports.PORT = exports.SECRET = exports.DATABASE_URL = void 0;
require("dotenv/config");
const DATABASE_URL = process.env.DATABASE_URL;
exports.DATABASE_URL = DATABASE_URL;
const SECRET = process.env.SECRET;
exports.SECRET = SECRET;
const PORT = process.env.PORT || 3001;
exports.PORT = PORT;
const SEED_USER_ID = process.env.SEED_USER_ID;
exports.SEED_USER_ID = SEED_USER_ID;
const DEMO_USER_ID = process.env.DEMO_USER_ID;
exports.DEMO_USER_ID = DEMO_USER_ID;
