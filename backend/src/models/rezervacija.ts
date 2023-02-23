import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Rezervacija = new Schema({
    id: {
        type: Number
    },
    korisnik: {
        type: String
    },
    sedista : [{
        type: String
    }],
    cena : {
        type: String
    }
})

export default mongoose.model('Rezervacija', Rezervacija, 'rezervacija');