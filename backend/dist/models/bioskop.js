"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Bioskopi = new Schema({
    idB: {
        type: Number
    },
    naziv: {
        type: String
    },
    ulica: {
        type: String
    },
    slika: {
        type: String
    },
    grad: {
        type: String
    },
    brTelefona: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Bioskopi', Bioskopi, 'bioskopi');
//# sourceMappingURL=bioskop.js.map