"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require("cors");
var rootController = __importStar(require("./controller/root.controller"));
var balanceController = __importStar(require("./controller/balance.controller"));
var app = express_1.default();
app.use(cors());
app.set('port', process.env.PORT || 3000);
app.get('/', rootController.index);
app.get('/balance', balanceController.index);
exports.default = app;
