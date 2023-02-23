import * as express from 'express';
import Rezervacija from '../models/rezervacija';
import BImaF from '../models/BImaF';
import Bioskop from '../models/bioskop';
import Filmovi from '../models/filmovi';
import Korisnik from '../models/korisnik';
import rezervacija from '../models/rezervacija';
import Ocena from '../models/ocena';
import { ObjectId } from 'mongodb';

export class KorisnikController{
    prijava = (req: express.Request, res: express.Response)=>{
        let korIme = req.body.korIme;

        Korisnik.findOne({'korIme':korIme},(err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik);
        });

    }

    getKorisnike = (req: express.Request, res: express.Response)=>{
        Korisnik.find({},(err, korisnici)=>{
            if(err) console.log(err);
            else res.json(korisnici);
        });

    }

    registracija = (req: express.Request, res: express.Response)=>{

        let kor = new Korisnik({ime: req.body.ime, prezime:req.body.prezime, korIme:req.body.korIme, lozinka:req.body.lozinka, grad:req.body.grad, datumRodjenja:req.body.datumRodjenja, telefon:req.body.telefon, email:req.body.email, tip:req.body.tip, odobren:req.body.odobren, slika:req.body.slika});

        Korisnik.insertMany(kor);
        res.json(kor);

    }

    promenaLozinke = (req: express.Request, res: express.Response)=>{

        Korisnik.collection.updateOne({'korIme':req.body.korIme},{$set: {'lozinka': req.body.lozinka}});
        res.json("ok");
    }

    changeKorisnik = (req: express.Request, res: express.Response)=>{

        Korisnik.collection.updateOne({'korIme':req.body.korIme},{$set: {'telefon': req.body.telefon,'email':req.body.email,'agencija':req.body.agencija}});
        res.json("ok");
    }

    getNeodobreneKorisnike = (req: express.Request, res: express.Response)=>{

        Korisnik.find({'odobren':'ne'},(err, korisnici)=>{
            if(err) console.log(err);
            else res.json(korisnici);
        });
    }

    prihvatiKorisnika = (req: express.Request, res: express.Response)=>{

        Korisnik.collection.updateOne({'korIme':req.body.korIme},{$set: {'odobren': 'da'}});
        res.json("ok");
    }

    unaprediKorisnika = (req: express.Request, res: express.Response)=>{

        Korisnik.collection.updateOne({'korIme':req.body.korIme},{$set: {'tip': 'moderator'}});
        res.json("ok");
    }

    deleteKorisnik = (req: express.Request, res: express.Response)=>{
        Korisnik.collection.deleteOne({'korIme':req.body.korIme},(err, news)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        });
    }

    changeKorisnikAdm = (req: express.Request, res: express.Response)=>{

        Korisnik.collection.updateOne({'korIme':req.body.korIme},{$set:{ime: req.body.ime, prezime:req.body.prezime, korIme:req.body.korIme, lozinka:req.body.lozinka, grad:req.body.grad, datumRodjenja:req.body.datumRodjenja, telefon:req.body.telefon, email:req.body.email, agencija:req.body.agencija, brojLicence: req.body.brojLicence, tip:req.body.tip, odobren:req.body.odobren, slika:req.body.slika}});
        res.json("ok");
    }

    getFilmove = (req: express.Request, res: express.Response)=>{
        Filmovi.find({},(err, filmovi)=>{
            if(err) console.log(err);
            else res.json(filmovi);
        });
    }

    
    getBioskope = (req: express.Request, res: express.Response)=>{
        Bioskop.find({},(err, bioskopi)=>{
            if(err) console.log(err);
            else res.json(bioskopi);
        });
    }

    getFilmPoNazivu = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.film;
        Filmovi.findOne({'naziv': naziv},(err, film)=>{
            if(err) console.log(err);
            else res.json(film);
        });
    }

    getBioskopPoNazivu = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.bioskop;
        Bioskop.findOne({'naziv': naziv},(err, bioskop)=>{
            if(err) console.log(err);
            else res.json(bioskop);
        });
    }

    pretraga = async (req: express.Request, res: express.Response)=>{
        let fimab = await BImaF.find({'idB': parseInt(req.body.idB)}).exec();

        const idFs = fimab.map(item => item.idF);
        //console.log(ids);
        let filmovi = await Filmovi.find({ 'idF': { $in: idFs } }).exec();
        //console.log(filmovi);
        if(req.body.zanr != 'svi') {
            filmovi = filmovi.filter(film => film.get("zanr").includes(req.body.zanr));
        }
        //console.log(filmovi);
        res.json(filmovi);
    }

    pretragaPoZanru = async (req: express.Request, res: express.Response)=>{
        let filmovi = await Filmovi.find({}).exec();
        filmovi = filmovi.filter(film => film.get("zanr").includes(req.body.zanr));
        //console.log(filmovi);
        res.json(filmovi);
    }

    
    changeFilmOcena = (req: express.Request, res: express.Response)=>{

        Filmovi.collection.updateOne({'idF':parseInt(req.body.idF)},{$set:{ocena: req.body.ocena}});
        res.json("ok");
    }

    getProjekcije = (req: express.Request, res: express.Response)=>{
        BImaF.find({'idB':parseInt(req.body.idB),'idF':parseInt(req.body.idF)},(err, projekcije)=>{
            if(err) console.log(err);
            else res.json(projekcije);
        });
    }

    getFilmPoId = (req: express.Request, res: express.Response)=>{
        Filmovi.findOne({'idF':parseInt(req.body.idF)},(err, film)=>{
            if(err) console.log(err);
            else res.json(film);
        });
    }

    getBioskopPoId = (req: express.Request, res: express.Response)=>{
        Bioskop.findOne({'idB':parseInt(req.body.idB)},(err, bioskop)=>{
            if(err) console.log(err);
            else res.json(bioskop);
        });
    }

    addRezervacija = (req: express.Request, res: express.Response)=>{
       
        let rez = new Rezervacija({id: req.body.id, korisnik:req.body.korisnik, sedista:req.body.sedista, cena:req.body.cena});

        Rezervacija.insertMany(rez);
        res.json(rez);
    }

    getRezervacijePoId = (req: express.Request, res: express.Response)=>{

        Rezervacija.find({'id': parseInt(req.body.id)},(err, rezervacije)=>{
            if(err) console.log(err);
            else res.json(rezervacije);
        });
    }

    addFilm = (req: express.Request, res: express.Response)=>{
       
        let film = new Filmovi({idF:parseInt(req.body.idF),naziv: req.body.naziv, datumPocetka:req.body.datumPocetka, slika: req.body.slika, zanr:req.body.zanr, trajanje:req.body.trajanje, trejler:req.body.trejler, sadrzaj: req.body.sadrzaj, glumci: req.body.glumci, reziser: req.body.reziser, godIzlaska: req.body.godIzlaska, brOcena: 0, ocena: 0, zbir: 0});

        Filmovi.insertMany(film);
        res.json(film);
    }

    getFimab = (req: express.Request, res: express.Response)=>{

        BImaF.find({},(err, fimab)=>{
            if(err) console.log(err);
            else res.json(fimab);
        });
    }

    addFimab = (req: express.Request, res: express.Response)=>{
       
        let fimab = new BImaF({id:parseInt(req.body.id), idB:parseInt(req.body.idB), idF:parseInt(req.body.idF),datum: req.body.datum, vreme: req.body.vreme, sala:req.body.sala, cena:req.body.cena});

        BImaF.insertMany(fimab);
        res.json(fimab);
    }

    addOcena = (req: express.Request, res: express.Response)=>{
       
        let ocena = new Ocena({idF:parseInt(req.body.idF), korisnik:req.body.korisnik, ocena:parseInt(req.body.ocena)});

        Ocena.insertMany(ocena);
        res.json(ocena);
    }

    postojiOcena = (req: express.Request, res: express.Response)=>{

       Ocena.findOne({'idF':parseInt(req.body.idF), 'korisnik': req.body.korisnik},(err, ocena)=>{
            if(err) console.log(err);
            else res.json(ocena);
        });
    }

    getOcene = (req: express.Request, res: express.Response)=>{

        Ocena.find({'idF':parseInt(req.body.idF)},(err, ocena)=>{
             if(err) console.log(err);
             else res.json(ocena);
         });
     }

     updateNesto = (req: express.Request, res: express.Response)=>{
        let user_id = req.body.idK;
        Korisnik.findOneAndUpdate({'_id':user_id},{ ime: 'NAloooo' },(err, korisnici)=>{
            if(err) console.log(err);
            else res.json(korisnici);
        });
     }
}