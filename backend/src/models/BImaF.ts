import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
})

export default mongoose.model('BImaF', BImaF, 'BImaF');