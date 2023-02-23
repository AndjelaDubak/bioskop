import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bioskop } from '../models/bioskop';
import { Film } from '../models/film';
import { FImaB } from '../models/fimab';
import { Korisnik } from '../models/korisnik';
import { Rezervacija } from '../models/rezervacija';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-sedista',
  templateUrl: './sedista.component.html',
  styleUrls: ['./sedista.component.css']
})
export class SedistaComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router: Router, private cdRef:ChangeDetectorRef) { 
    this.sedista = [];
    this.novaRezervacija = [];
    this.brNovih = 0;
    this.cena = 0;
    this.uspesno = false;
    this.poruka = false;
  }

  ngOnInit(): void {
    this.projekcija = JSON.parse(sessionStorage.getItem('projekcija'));
    this.korisnik = JSON.parse(sessionStorage.getItem('ulogovan'));

    this.prijavaServis.getRezervacijePoId(this.projekcija.id).subscribe((rezervacije:Rezervacija[])=>{
      for(let i=0; i<18; i++) {
        this.sedista[i] = 0; 
      }
      for(let i=0; i<rezervacije.length; i++) {
        for(let j=0; j<rezervacije[i].sedista.length; j++) {
          this.sedista[parseInt(rezervacije[i].sedista[j])] = 2;
          this.cdRef.detectChanges();
        }
      }
      console.log(this.sedista);
    })

    this.prijavaServis.getFilmPoId(this.projekcija.idF).subscribe((film:Film)=>{
      this.film = film.naziv;
     
    })

    this.prijavaServis.getBioskopPoId(this.projekcija.idB).subscribe((bioskop:Bioskop)=>{
      this.bioskop = bioskop.naziv;
    })

  }

  projekcija: FImaB;
  film: String;
  bioskop: String;
  sedista: number[];
  novaRezervacija: String[];
  brNovih: number;
  korisnik: Korisnik;
  cena: number;
  uspesno: boolean;
  poruka: boolean;

  sediste(broj) {
    if(this.sedista[broj] == 0) {
      this.sedista[broj] = 1;
      this.novaRezervacija[this.brNovih++] = broj;
      this.cena = parseInt(this.projekcija.cena)*this.brNovih;
    }
    else if(this.sedista[broj] == 1) {
      for(let i=0; i<this.novaRezervacija.length; i++) {
        if(this.novaRezervacija[i] == broj) {
          this.novaRezervacija.splice(i,1);
        }
      }
      this.brNovih--;
      this.cena = parseInt(this.projekcija.cena)*this.brNovih;
      this.sedista[broj] = 0;
    }
  }

  rezervisi() {
    if(this.korisnik == null) {
      this.poruka = true;
    }
    else {
      let cena = 0;
      cena = parseInt(this.projekcija.cena)*this.brNovih;
      console.log(cena);
      this.prijavaServis.addRezervacija(this.projekcija.id, this.korisnik.korIme, this.novaRezervacija, cena).subscribe((rezervacija: Rezervacija)=>{
        this.uspesno = true;
      })
    }
    
  }

}
