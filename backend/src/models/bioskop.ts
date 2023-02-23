import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
})

export default mongoose.model('Bioskopi', Bioskopi, 'bioskopi');