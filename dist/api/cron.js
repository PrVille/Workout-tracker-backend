"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    runtime: "edge",
};
exports.default = (request) => {
    console.log(`Hello, from ${request.url} I'm now an Edge Function!`);
};
