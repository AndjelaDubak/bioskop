"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const rezervacija_1 = __importDefault(require("../models/rezervacija"));
const BImaF_1 = __importDefault(require("../models/BImaF"));
const bioskop_1 = __importDefault(require("../models/bioskop"));
const filmovi_1 = __importDefault(require("../models/filmovi"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
const ocena_1 = __importDefault(require("../models/ocena"));
class KorisnikController {
    constructor() {
        this.prijava = (req, res) => {
            let korIme = req.body.korIme;
            korisnik_1.default.findOne({ 'korIme': korIme }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        this.getKorisnike = (req, res) => {
            korisnik_1.default.find({}, (err, korisnici) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnici);
            });
        };
        this.registracija = (req, res) => {
            let kor = new korisnik_1.default({ ime: req.body.ime, prezime: req.body.prezime, korIme: req.body.korIme, lozinka: req.body.lozinka, grad: req.body.grad, datumRodjenja: req.body.datumRodjenja, telefon: req.body.telefon, email: req.body.email, tip: req.body.tip, odobren: req.body.odobren, slika: req.body.slika });
            korisnik_1.default.insertMany(kor);
            res.json(kor);
        };
        this.promenaLozinke = (req, res) => {
            korisnik_1.default.collection.updateOne({ 'korIme': req.body.korIme }, { $set: { 'lozinka': req.body.lozinka } });
            res.json("ok");
        };
        this.changeKorisnik = (req, res) => {
            korisnik_1.default.collection.updateOne({ 'korIme': req.body.korIme }, { $set: { 'telefon': req.body.telefon, 'email': req.body.email, 'agencija': req.body.agencija } });
            res.json("ok");
        };
        this.getNeodobreneKorisnike = (req, res) => {
            korisnik_1.default.find({ 'odobren': 'ne' }, (err, korisnici) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnici);
            });
        };
        this.prihvatiKorisnika = (req, res) => {
            korisnik_1.default.collection.updateOne({ 'korIme': req.body.korIme }, { $set: { 'odobren': 'da' } });
            res.json("ok");
        };
        this.unaprediKorisnika = (req, res) => {
            korisnik_1.default.collection.updateOne({ 'korIme': req.body.korIme }, { $set: { 'tip': 'moderator' } });
            res.json("ok");
        };
        this.deleteKorisnik = (req, res) => {
            korisnik_1.default.collection.deleteOne({ 'korIme': req.body.korIme }, (err, news) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.changeKorisnikAdm = (req, res) => {
            korisnik_1.default.collection.updateOne({ 'korIme': req.body.korIme }, { $set: { ime: req.body.ime, prezime: req.body.prezime, korIme: req.body.korIme, lozinka: req.body.lozinka, grad: req.body.grad, datumRodjenja: req.body.datumRodjenja, telefon: req.body.telefon, email: req.body.email, agencija: req.body.agencija, brojLicence: req.body.brojLicence, tip: req.body.tip, odobren: req.body.odobren, slika: req.body.slika } });
            res.json("ok");
        };
        this.getFilmove = (req, res) => {
            filmovi_1.default.find({}, (err, filmovi) => {
                if (err)
                    console.log(err);
                else
                    res.json(filmovi);
            });
        };
        this.getBioskope = (req, res) => {
            bioskop_1.default.find({}, (err, bioskopi) => {
                if (err)
                    console.log(err);
                else
                    res.json(bioskopi);
            });
        };
        this.getFilmPoNazivu = (req, res) => {
            let naziv = req.body.film;
            filmovi_1.default.findOne({ 'naziv': naziv }, (err, film) => {
                if (err)
                    console.log(err);
                else
                    res.json(film);
            });
        };
        this.getBioskopPoNazivu = (req, res) => {
            let naziv = req.body.bioskop;
            bioskop_1.default.findOne({ 'naziv': naziv }, (err, bioskop) => {
                if (err)
                    console.log(err);
                else
                    res.json(bioskop);
            });
        };
        this.pretraga = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let fimab = yield BImaF_1.default.find({ 'idB': parseInt(req.body.idB) }).exec();
            const idFs = fimab.map(item => item.idF);
            //console.log(ids);
            let filmovi = yield filmovi_1.default.find({ 'idF': { $in: idFs } }).exec();
            //console.log(filmovi);
            if (req.body.zanr != 'svi') {
                filmovi = filmovi.filter(film => film.get("zanr").includes(req.body.zanr));
            }
            //console.log(filmovi);
            res.json(filmovi);
        });
        this.pretragaPoZanru = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let filmovi = yield filmovi_1.default.find({}).exec();
            filmovi = filmovi.filter(film => film.get("zanr").includes(req.body.zanr));
            //console.log(filmovi);
            res.json(filmovi);
        });
        this.changeFilmOcena = (req, res) => {
            filmovi_1.default.collection.updateOne({ 'idF': parseInt(req.body.idF) }, { $set: { ocena: req.body.ocena } });
            res.json("ok");
        };
        this.getProjekcije = (req, res) => {
            BImaF_1.default.find({ 'idB': parseInt(req.body.idB), 'idF': parseInt(req.body.idF) }, (err, projekcije) => {
                if (err)
                    console.log(err);
                else
                    res.json(projekcije);
            });
        };
        this.getFilmPoId = (req, res) => {
            filmovi_1.default.findOne({ 'idF': parseInt(req.body.idF) }, (err, film) => {
                if (err)
                    console.log(err);
                else
                    res.json(film);
            });
        };
        this.getBioskopPoId = (req, res) => {
            bioskop_1.default.findOne({ 'idB': parseInt(req.body.idB) }, (err, bioskop) => {
                if (err)
                    console.log(err);
                else
                    res.json(bioskop);
            });
        };
        this.addRezervacija = (req, res) => {
            let rez = new rezervacija_1.default({ id: req.body.id, korisnik: req.body.korisnik, sedista: req.body.sedista, cena: req.body.cena });
            rezervacija_1.default.insertMany(rez);
            res.json(rez);
        };
        this.getRezervacijePoId = (req, res) => {
            rezervacija_1.default.find({ 'id': parseInt(req.body.id) }, (err, rezervacije) => {
                if (err)
                    console.log(err);
                else
                    res.json(rezervacije);
            });
        };
        this.addFilm = (req, res) => {
            let film = new filmovi_1.default({ idF: parseInt(req.body.idF), naziv: req.body.naziv, datumPocetka: req.body.datumPocetka, slika: req.body.slika, zanr: req.body.zanr, trajanje: req.body.trajanje, trejler: req.body.trejler, sadrzaj: req.body.sadrzaj, glumci: req.body.glumci, reziser: req.body.reziser, godIzlaska: req.body.godIzlaska, brOcena: 0, ocena: 0, zbir: 0 });
            filmovi_1.default.insertMany(film);
            res.json(film);
        };
        this.getFimab = (req, res) => {
            BImaF_1.default.find({}, (err, fimab) => {
                if (err)
                    console.log(err);
                else
                    res.json(fimab);
            });
        };
        this.addFimab = (req, res) => {
            let fimab = new BImaF_1.default({ id: parseInt(req.body.id), idB: parseInt(req.body.idB), idF: parseInt(req.body.idF), datum: req.body.datum, vreme: req.body.vreme, sala: req.body.sala, cena: req.body.cena });
            BImaF_1.default.insertMany(fimab);
            res.json(fimab);
        };
        this.addOcena = (req, res) => {
            let ocena = new ocena_1.default({ idF: parseInt(req.body.idF), korisnik: req.body.korisnik, ocena: parseInt(req.body.ocena) });
            ocena_1.default.insertMany(ocena);
            res.json(ocena);
        };
        this.postojiOcena = (req, res) => {
            ocena_1.default.findOne({ 'idF': parseInt(req.body.idF), 'korisnik': req.body.korisnik }, (err, ocena) => {
                if (err)
                    console.log(err);
                else
                    res.json(ocena);
            });
        };
        this.getOcene = (req, res) => {
            ocena_1.default.find({ 'idF': parseInt(req.body.idF) }, (err, ocena) => {
                if (err)
                    console.log(err);
                else
                    res.json(ocena);
            });
        };
        this.updateNesto = (req, res) => {
            let user_id = req.body.idK;
            korisnik_1.default.findOneAndUpdate({ '_id': user_id }, { ime: 'NAloooo' }, (err, korisnici) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnici);
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map