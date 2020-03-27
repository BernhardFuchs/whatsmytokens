"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = function (req, res) {
    console.log("Root Path for Request: " + req);
    res.json({
        message: 'Hello from Server'
    });
};
