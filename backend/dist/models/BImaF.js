"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let BImaF = new Schema({
    id: {
        type: Number
    },
    idB: {
        type: Number
    },
    idF: {
        type: Number
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    sala: {
        type: String
    },
    cena: {
        type: String
    }
});
exports.default = mongoose_1.default.model('BImaF', BImaF, 'BImaF');
//# sourceMappingURL=BImaF.js.map