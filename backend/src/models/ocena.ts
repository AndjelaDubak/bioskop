import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Ocena = new Schema({
    idF: {
        type: Number
    },
    korisnik: {
        type: String
    },
    ocena: {
        type: Number
    }
})

export default mongoose.model('Ocena', Ocena, 'ocene');