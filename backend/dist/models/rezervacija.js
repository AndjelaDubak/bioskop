"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Rezervacija = new Schema({
    id: {
        type: Number
    },
    korisnik: {
        type: String
    },
    sedista: [{
            type: String
        }],
    cena: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Rezervacija', Rezervacija, 'rezervacija');
//# sourceMappingURL=rezervacija.js.map