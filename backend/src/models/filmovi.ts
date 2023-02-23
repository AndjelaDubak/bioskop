import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
})

export default mongoose.model('Filmovi', Filmovi, 'filmovi');