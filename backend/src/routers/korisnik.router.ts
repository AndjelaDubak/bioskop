import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/prijava').post(
    (req, res)=>new KorisnikController().prijava(req, res)
)

korisnikRouter.route('/getFilmove').get(
    (req, res)=>new KorisnikController().getFilmove(req, res)
)

korisnikRouter.route('/getKorisnike').get(
    (req, res)=>new KorisnikController().getKorisnike(req, res)
)

korisnikRouter.route('/registracija').post(
    (req, res)=>new KorisnikController().registracija(req, res)
)

korisnikRouter.route('/getBioskope').get(
    (req, res)=>new KorisnikController().getBioskope(req, res)
)

korisnikRouter.route('/getBioskopPoNazivu').post(
    (req, res)=>new KorisnikController().getBioskopPoNazivu(req, res)
)

korisnikRouter.route('/getFilmPoNazivu').post(
    (req, res)=>new KorisnikController().getFilmPoNazivu(req, res)
)

korisnikRouter.route('/pretraga').post(
    (req, res)=>new KorisnikController().pretraga(req, res)
)

korisnikRouter.route('/pretragaPoZanru').post(
    (req, res)=>new KorisnikController().pretragaPoZanru(req, res)
)

korisnikRouter.route('/promenaLozinke').post(
    (req, res)=>new KorisnikController().promenaLozinke(req, res)
)

korisnikRouter.route('/deleteKorisnik').post(
    (req, res)=>new KorisnikController().deleteKorisnik(req, res)
)

korisnikRouter.route('/prihvatiKorisnika').post(
    (req, res)=>new KorisnikController().prihvatiKorisnika(req, res)
)

korisnikRouter.route('/unaprediiKorisnika').post(
    (req, res)=>new KorisnikController().unaprediKorisnika(req, res)
)

korisnikRouter.route('/changeFilmOcena').post(
    (req, res)=>new KorisnikController().changeFilmOcena(req, res)
)

korisnikRouter.route('/getProjekcije').post(
    (req, res)=>new KorisnikController().getProjekcije(req, res)
)

korisnikRouter.route('/getFilmPoId').post(
    (req, res)=>new KorisnikController().getFilmPoId(req, res)
)

korisnikRouter.route('/getBioskopPoId').post(
    (req, res)=>new KorisnikController().getBioskopPoId(req, res)
)

korisnikRouter.route('/addRezervacija').post(
    (req, res)=>new KorisnikController().addRezervacija(req, res)
)

korisnikRouter.route('/getRezervacijePoId').post(
    (req, res)=>new KorisnikController().getRezervacijePoId(req, res)
)

korisnikRouter.route('/addFilm').post(
    (req, res)=>new KorisnikController().addFilm(req, res)
)

korisnikRouter.route('/getFimab').get(
    (req, res)=>new KorisnikController().getFimab(req, res)
)

korisnikRouter.route('/addFimab').post(
    (req, res)=>new KorisnikController().addFimab(req, res)
)

korisnikRouter.route('/addOcena').post(
    (req, res)=>new KorisnikController().addOcena(req, res)
)

korisnikRouter.route('/postojiOcena').post(
    (req, res)=>new KorisnikController().postojiOcena(req, res)
)

korisnikRouter.route('/getOcene').post(
    (req, res)=>new KorisnikController().getOcene(req, res)
)

korisnikRouter.route('/updateNesto').post(
    (req, res)=>new KorisnikController().updateNesto(req, res)
)

export default korisnikRouter;