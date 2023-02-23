import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrijavaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  prijava(korIme){
    const data={
      korIme: korIme
    }

    return this.http.post(`${this.uri}/korisnik/prijava`, data);
  }

  getKorisnike() {
    return this.http.get(`${this.uri}/korisnik/getKorisnike`);
  }

  registracija(ime,prezime,korIme,lozinka,grad,datumRodjenja,telefon,email,tip,slika,odobren) {
    const data={
      ime: ime,
      prezime: prezime,
      korIme: korIme,
      lozinka: lozinka,
      grad: grad,
      datumRodjenja: datumRodjenja,
      telefon: telefon,
      email: email,
      tip: tip,
      odobren : odobren,
      slika: slika
    }

    return this.http.post(`${this.uri}/korisnik/registracija`, data);
  }

  promenaLozinke(korIme,lozinka) {
    const data = {
      korIme:korIme,
      lozinka:lozinka
    }

    return this.http.post(`${this.uri}/korisnik/promenaLozinke`, data);
  }

  getFilmove() {
    return this.http.get(`${this.uri}/korisnik/getFilmove`);
  }

  getBioskope() {
    return this.http.get(`${this.uri}/korisnik/getBioskope`);
  }

  getFilmPoNazivu(film) {
    const data = {
      film : film
    }
    return this.http.post(`${this.uri}/korisnik/getFilmPoNazivu`, data);
  }

  getBioskopPoNazivu(bioskop) {
    const data = {
      bioskop : bioskop
    }
    return this.http.post(`${this.uri}/korisnik/getBioskopPoNazivu`, data);
  }

  pretraga(idB, zanr) {
    const data = {
      idB : idB,
      zanr : zanr
    }
    return this.http.post(`${this.uri}/korisnik/pretraga`, data);
  }

  pretragaPoZanru(zanr) {
    const data = {
      zanr : zanr
    }
    return this.http.post(`${this.uri}/korisnik/pretragaPoZanru`, data);
  }

  prihvatiKorisnika(korIme) {
    const data = {
      korIme:korIme
    }

    return this.http.post(`${this.uri}/korisnik/prihvatiKorisnika`, data);
  }

  unaprediKorisnika(korIme) {
    const data = {
      korIme:korIme
    }

    return this.http.post(`${this.uri}/korisnik/unaprediKorisnika`, data);
  }

  deleteKorisnik(korIme) {
    const data = {
      korIme:korIme
    }

    return this.http.post(`${this.uri}/korisnik/deleteKorisnik`, data);
  }

  changeKorisnikAdm(ime,prezime,korIme,lozinka,grad,datumRodjenja,telefon,email,agencija,brojLicence,tip,slika,odobren) {
    const data={
      ime:ime,
      prezime:prezime,
      korIme: korIme,
      lozinka: lozinka,
      grad: grad,
      datumRodjenja: datumRodjenja,
      telefon: telefon,
      email: email,
      agencija: agencija,
      brojLicence: brojLicence,
      tip: tip,
      odobren : odobren,
      slika:slika
    }

    return this.http.post(`${this.uri}/korisnik/changeKorisnikAdm`, data);
  }

  changeFilmOcena(idF, ocena) {
    const data = {
      idF : idF,
      ocena : ocena
    }
    return this.http.post(`${this.uri}/korisnik/changeFilmOcena`, data);
  }

  getProjekcije(idB, idF) {
    const data = {
      idB: idB,
      idF : idF
    }
    return this.http.post(`${this.uri}/korisnik/getProjekcije`, data);
  }

  getFilmPoId(idF) {
    const data = {
      idF : idF
    }
    return this.http.post(`${this.uri}/korisnik/getFilmPoId`, data);
  }

  getBioskopPoId(idB) {
    const data = {
      idB : idB
    }
    return this.http.post(`${this.uri}/korisnik/getBioskopPoId`, data);
  }

  addRezervacija(id, korisnik, sedista, cena) {
    const data = {
      id : id,
      korisnik : korisnik,
      sedista : sedista,
      cena: cena
    }
    return this.http.post(`${this.uri}/korisnik/addRezervacija`, data);
  }

  
  getRezervacijePoId(id) {
    const data = {
      id : id
    }
    return this.http.post(`${this.uri}/korisnik/getRezervacijePoId`, data);
  }

  addFilm(idF,naziv,datumPocetka,trajanje,trejler,sadrzaj,glumci,reziser,godIzlaska,slika,zanr) {
    const data={
      idF:idF,
      naziv: naziv,
      datumPocetka: datumPocetka,
      trajanje: trajanje,
      trejler: trejler,
      sadrzaj: sadrzaj,
      glumci: glumci,
      reziser: reziser,
      godIzlaska: godIzlaska,
      slika: slika,
      zanr: zanr
    }

    return this.http.post(`${this.uri}/korisnik/addFilm`, data);
  }

  getFimab() {
    return this.http.get(`${this.uri}/korisnik/getFimab`);
  }

  addFimab(id,idB,idF,datum,vreme,sala,cena) {
    const data={
      id: id,
      idB: idB,
      idF: idF,
      datum: datum,
      vreme: vreme,
      sala: sala,
      cena: cena
    }

    return this.http.post(`${this.uri}/korisnik/addFimab`, data);
  }

  addOcena(idF,korisnik,ocena) {
    const data={
      idF: idF,
      korisnik: korisnik,
      ocena: ocena
    }

    return this.http.post(`${this.uri}/korisnik/addOcena`, data);
  }

  postojiOcena(idF,korisnik) {
    const data={
      idF: idF,
      korisnik: korisnik
    }

    return this.http.post(`${this.uri}/korisnik/postojiOcena`, data);
  }

  getOcene(idF) {
    const data={
      idF: idF
    }

    return this.http.post(`${this.uri}/korisnik/getOcene`, data);
  }

  updateNesto(idK) {
    const data={
      idK: idK
    }
    return this.http.post(`${this.uri}/korisnik/updateNesto`,data);
  }

}
