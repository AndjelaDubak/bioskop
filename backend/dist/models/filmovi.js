"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Filmovi = new Schema({
    idF: {
        type: Number
    },
    naziv: {
        type: String
    },
    datumPocetka: {
        type: String
    },
    slika: {
        type: String
    },
    zanr: [{
            type: String
        }],
    trajanje: {
        type: String
    },
    trejler: {
        type: String
    },
    sadrzaj: {
        type: String
    },
    glumci: {
        type: String
    },
    reziser: {
        type: String
    },
    godIzlaska: {
        type: String
    },
    brOcena: {
        type: Number
    },
    ocena: {
        type: Number
    },
    zbir: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Filmovi', Filmovi, 'filmovi');
//# sourceMappingURL=filmovi.js.map