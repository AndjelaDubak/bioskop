import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Bioskop } from '../models/bioskop';
import { Film } from '../models/film';
import { Korisnik } from '../models/korisnik';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-repertoar',
  templateUrl: './repertoar.component.html',
  styleUrls: ['./repertoar.component.css']
})
export class RepertoarComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router: Router, private cdRef:ChangeDetectorRef, config: NgbRatingConfig) { 
    this.filmovi = [];
    this.sviFilmovi = [];
    this.bioskopi = [];
    this.bioskop = 'svi';
    this.zanr = 'svi';
    this.isCheckedAbeceda = true;
    this.isCheckedHronoloski = false;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.prijavaServis.getFilmove().subscribe((filmovi:Film[])=>{
      let trenutni = new Date();
      let brFilmova = 0;
      for(let i=0; i<filmovi.length; i++) {
        let datumPocetka = filmovi[i].datumPocetka.split('.');
        let dan = parseInt(datumPocetka[0]);
        let mesec = parseInt(datumPocetka[1]);
        let godina = parseInt(datumPocetka[2]);
        if(!(godina > trenutni.getFullYear() || (godina == trenutni.getFullYear() && mesec > trenutni.getMonth() + 1) ||
        (godina == trenutni.getFullYear() && mesec == trenutni.getMonth() + 1 && dan > trenutni.getDate()))) {
          this.sviFilmovi[brFilmova++] = filmovi[i];
        }
      }
     // console.log(this.sviFilmovi);
      this.cdRef.detectChanges();
      console.log(this.sviFilmovi.length);
      this.filmovi = this.sviFilmovi;
      this.sortirajAbecedno(this.filmovi);
      this.korisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
    })

    this.prijavaServis.getBioskope().subscribe((bioskopi:Bioskop[])=>{
      this.bioskopi = bioskopi;
      let b = new Bioskop();
      b.naziv = 'svi';
      this.bioskopi.unshift(b);
    })
  }

  sviFilmovi: Film[];
  filmovi: Film[];
  bioskopi: Bioskop[];
  bioskop: string;
  zanr: string;
  isCheckedAbeceda: Boolean;
  isCheckedHronoloski: Boolean;
  korisnik: Korisnik;

  izbaciFilmove(films) {
    let trenutni = new Date();
    console.log(films.length);
    let k = 0;
    for(let i=0; i<films.length; i++) {
      k++;
      console.log(films[i].datumPocetka);
      let datumPocetka = films[i].datumPocetka.split('.');
      let dan = parseInt(datumPocetka[0]);
      let mesec = parseInt(datumPocetka[1]);
      let godina = parseInt(datumPocetka[2]);
      //console.log(dan); console.log(mesec); console.log(godina);
      if(godina > trenutni.getFullYear() || (godina == trenutni.getFullYear() && mesec > trenutni.getMonth() + 1) ||
      (godina == trenutni.getFullYear() && mesec == trenutni.getMonth() + 1 && dan > trenutni.getDate())) {
        films.splice(i,1);
      }
    }
    console.log(films.length);
    this.cdRef.detectChanges();
  }

  onChangeBioskop() {
    if(this.bioskop == 'svi' && this.zanr == 'svi') {
      this.filmovi = this.sviFilmovi;
      if(this.isCheckedAbeceda == true) this.onChangeSortAbecedno();
      else this.onChangeSortHronoloski();
    }
    else if(this.bioskop != 'svi') {
      this.prijavaServis.getBioskopPoNazivu(this.bioskop).subscribe((bioskop: Bioskop)=>{
        let idB = bioskop.idB;
        this.prijavaServis.pretraga(idB, this.zanr).subscribe((filmovi:Film[])=>{
          this.filmovi = filmovi;
          this.izbaciFilmove(filmovi);
          if(this.isCheckedAbeceda == true) this.onChangeSortAbecedno();
          else this.onChangeSortHronoloski();
        })
      })
    }
    else if(this.zanr != 'svi') {
      this.prijavaServis.pretragaPoZanru(this.zanr).subscribe((filmovi:Film[])=>{
        this.filmovi = filmovi;
        if(this.isCheckedAbeceda == true) this.onChangeSortAbecedno();
        else this.onChangeSortHronoloski();
      })
    }
  }

  onChangeZanr() {
    if(this.bioskop == 'svi' && this.zanr == 'svi') {
      this.filmovi = this.sviFilmovi;
    }
    else if(this.bioskop != 'svi') {
      this.prijavaServis.getBioskopPoNazivu(this.bioskop).subscribe((bioskop: Bioskop)=>{
        let idB = bioskop.idB;
        this.prijavaServis.pretraga(idB, this.zanr).subscribe((filmovi:Film[])=>{
          this.filmovi = filmovi;
        })
      })
    }
    else if(this.zanr != 'svi'){
      this.prijavaServis.pretragaPoZanru(this.zanr).subscribe((filmovi:Film[])=>{
        this.filmovi = filmovi;
      })
    }
  }

  onChangeSortAbecedno() {
    this.sortirajAbecedno(this.filmovi);
    this.isCheckedAbeceda = true;
    this.isCheckedHronoloski = false;
  }

  sortirajAbecedno(niz) {
    niz.sort(function (a, b) {
      if (a.naziv < b.naziv) {
        return -1;
      }
      if (a.naziv > b.naziv) {
        return 1;
      }
      return 0;
    });
  }

  onChangeSortHronoloski() {
    this.sortirajHronoloski(this.filmovi);
    this.isCheckedAbeceda = false;
    this.isCheckedHronoloski = true;
  }

  sortirajHronoloski(niz) {
    niz.sort(function (a, b) {
      let datum1 = a.datumPocetka.split('.');
      let datum2 = b.datumPocetka.split('.');
      if (parseInt(datum1[2]) > parseInt(datum2[2])) return 1;
      else if(parseInt(datum1[2]) == parseInt(datum2[2]) && parseInt(datum1[1]) > parseInt(datum2[1])) return 1;
      else if(parseInt(datum1[2]) == parseInt(datum2[2]) && parseInt(datum1[1]) == parseInt(datum2[1]) && parseInt(datum1[0]) > parseInt(datum2[0])) return 1;
      else return -1;
    });
  }

  odjava() {
    sessionStorage.removeItem('ulogovan');
  }

  otvoriFilm(film) {
    sessionStorage.setItem('film',JSON.stringify(film));
    this.router.navigate(['/film']);
  }

}
