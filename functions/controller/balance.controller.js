"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var web3_1 = __importDefault(require("web3"));
var constants_1 = require("../constants");
var web3 = new web3_1.default(constants_1.infuraMain.href);
exports.index = function (req, res) {
    console.log("Balance Path for Address: " + req.header('address'));
    var address = req.header('address');
    if (address !== undefined && isValidAddress(address)) {
        web3.eth
            .getBalance(address.trim())
            .then(function (balance) {
            res.json({
                balance: web3.utils.fromWei(balance, 'ether')
            });
        })
            .catch(function (err) { return console.log("Error in web3: " + err.message); });
    }
    else {
        res.json({
            message: 'ERROR: Address is not valid'
        });
    }
};
var isValidAddress = function (address) {
    return (!lodash_1.isEmpty(address) &&
        lodash_1.isLength(address.length) &&
        address.length === 42 &&
        lodash_1.startsWith(address, '0x'));
};
