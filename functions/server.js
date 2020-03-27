"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var server = index_1.default.listen(index_1.default.get('port'), function () {
    console.log("App is running at http://localhost:" + index_1.default.get('port') + "\n  in " + index_1.default.get('env') + " mode\n" + '  Press CTRL-C to stop\n');
});
exports.default = server;
