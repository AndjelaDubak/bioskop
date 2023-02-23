import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    grad: {
        type: String
    },
    datumRodjenja: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    tip: {
        type: String
    },
    odobren: {
        type: String
    },
    slika: {
        type: String
    }
})

export default mongoose.model('Korisnik', Korisnik, 'korisnici');