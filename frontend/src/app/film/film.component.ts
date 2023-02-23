import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Bioskop } from '../models/bioskop';
import { Film } from '../models/film';
import { FImaB } from '../models/fimab';
import { Korisnik } from '../models/korisnik';
import { Ocena } from '../models/ocene';
import { SafePipe } from '../safe.pipe';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})

export class FilmComponent implements OnInit {
  
  private safePipe: SafePipe = new SafePipe(this.domSanitizer);

  constructor(private prijavaServis: PrijavaService, private router: Router, private domSanitizer: DomSanitizer, config: NgbRatingConfig) {
    this.bioskopi = [];
    this.projekcije = [];
    this.danasnjeProjekcije = [];
    this.sutrasnjeProjekcije = [];
    this.vecOcenio = false;
    this.ocena = 0;
    let d = new Date();
    let mesec = d.getMonth() + 1;
    let dan = d.getDate() + 1;
    this.danas = d.getDate() + '.' + mesec + '.' + d.getFullYear() + '.';
    this.sutra = dan + '.' + mesec + '.' + d.getFullYear() + '.';
    this.korisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
    if(this.korisnik == null) {
      config.readonly = true;
    }
   }


  ngOnInit(): void {
    let f = JSON.parse(sessionStorage.getItem('film'));
    let naziv = f.naziv;
    this.prijavaServis.getFilmPoNazivu(naziv).subscribe((film:Film)=>{
      this.itsSafe = this.safePipe.transform('fs');
      this.film = film;
      let trenutni = new Date();
      let datum = this.film.datumPocetka.split('.');
      let dan = parseInt(datum[0]);
      let mesec = parseInt(datum[1]);
      let godina = parseInt(datum[2]);
      if(godina > trenutni.getFullYear() || (godina == trenutni.getFullYear() && mesec > trenutni.getMonth() + 1) ||
      (godina == trenutni.getFullYear() && mesec == trenutni.getMonth() + 1 && dan > trenutni.getDate())) {
        this.buduci=true;
      }
      else {
        this.buduci = false;
      }

    })

    this.prijavaServis.getBioskope().subscribe((bioskopi:Bioskop[])=>{
      this.bioskopi = bioskopi;
      this.bioskop = this.bioskopi[0].naziv;
      this.prijavaServis.getProjekcije(this.bioskopi[0].idB, this.film.idF).subscribe((projekcije: FImaB[])=> {
        this.projekcije = projekcije;
        let danas = new Date();
      let brDanasnjih = 0;
      let brSutrasnjih = 0;
      for(let i=0; i<this.projekcije.length; i++) {
        let datum = this.projekcije[i].datum.split('.');
        let dan = parseInt(datum[0]);
        let mesec = parseInt(datum[1]);
        let godina = parseInt(datum[2]);
        if(danas.getFullYear()== godina && danas.getMonth() + 1 == mesec && danas.getDate() == dan) {
          this.danasnjeProjekcije[brDanasnjih++] = this.projekcije[i];
        }
        if(danas.getFullYear()== godina && danas.getMonth() + 1 == mesec && dan == danas.getDate() + 1) {
          this.sutrasnjeProjekcije[brSutrasnjih++] = this.projekcije[i];
        }
      }
      })
    })

   
  }

  itsSafe: SafeHtml;

  film: Film;
  ocena: number;
  korisnik: Korisnik;
  bioskopi: Bioskop[];
  bioskop: string;
  projekcije: FImaB[];
  danasnjeProjekcije: FImaB[];
  sutrasnjeProjekcije: FImaB[];
  danas: String;
  sutra: String;
  buduci: boolean;
  vecOcenio: boolean;

  photoURL() {
    return this.safePipe.transform(this.film.trejler);
  }

  oceni(ocena :number) {
    if(this.korisnik!=null) {
      this.prijavaServis.getFilmPoNazivu(this.film.naziv).subscribe((film:Film)=>{
        this.film = film;
        this.prijavaServis.postojiOcena(this.film.idF, this.korisnik.korIme).subscribe((o:Ocena)=>{
          if(o!=null) {
            this.vecOcenio = true;
          }
          else {
            this.prijavaServis.addOcena(this.film.idF, this.korisnik.korIme, ocena).subscribe((ok: String)=>{
              this.prijavaServis.getOcene(this.film.idF).subscribe((ocene: Ocena[])=>{
                let zbir = 0;
                for(let i=0; i<ocene.length; i++) {
                  zbir+=ocene[i].ocena;
                }
                let novaOcena = zbir/ocene.length;
                this.prijavaServis.changeFilmOcena(this.film.idF, novaOcena).subscribe((ok:String)=>{
                  this.prijavaServis.getFilmPoNazivu(this.film.naziv).subscribe((film:Film)=>{
                    this.film = film;
                  })
                })
              })
            })
          }
        })
       
      })
    }
    else {
      this.router.navigate(['/prijava']);
    }
    
  }

  onChangeBioskop() {
    let idB = 0;
    for(let i=0; i<this.bioskopi.length; i++) {
      if(this.bioskopi[i].naziv == this.bioskop) {
        idB = this.bioskopi[i].idB;
      }
    }
    this.prijavaServis.getProjekcije(idB, this.film.idF).subscribe((projekcije: FImaB[])=> {
      this.projekcije = projekcije;
      let danas = new Date();
      let brDanasnjih = 0;
      let brSutrasnjih = 0;
      for(let i=0; i<this.projekcije.length; i++) {
        let datum = this.projekcije[i].datum.split('.');
        let dan = parseInt(datum[0]);
        let mesec = parseInt(datum[1]);
        let godina = parseInt(datum[2]);
        if(danas.getFullYear()== godina && danas.getMonth() + 1 == mesec && danas.getDate() == dan) {
          this.danasnjeProjekcije[brDanasnjih++] = this.projekcije[i];
        }
        if(danas.getFullYear()== godina && danas.getMonth() + 1 == mesec && dan == danas.getDate() + 1) {
          this.sutrasnjeProjekcije[brSutrasnjih++] = this.projekcije[i];
        }
      }
    })
  }

  rezervisi(p) {
    sessionStorage.setItem('projekcija', JSON.stringify(p));
    this.router.navigate(['/sedista']);
  }

}
