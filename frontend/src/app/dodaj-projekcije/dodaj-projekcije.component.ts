import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Bioskop } from '../models/bioskop';
import { Film } from '../models/film';
import { FImaB } from '../models/fimab';
import { Korisnik } from '../models/korisnik';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-dodaj-projekcije',
  templateUrl: './dodaj-projekcije.component.html',
  styleUrls: ['./dodaj-projekcije.component.css']
})
export class DodajProjekcijeComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router: Router) { 
    this.filmovi = [];
    this.bioskopi = [];
    this.rezBioskopi = [];
  }

  ngOnInit(): void {
    this.datum = '';
    this.vreme = '';
    this.sala = '';
    this.cena = '';
    this.uspesno = false;

    this.prijavaServis.getFilmove().subscribe((filmovi: Film[])=> {
     this.filmovi = filmovi;
     this.film = filmovi[0].naziv;
    });

    this.prijavaServis.getBioskope().subscribe((bioskopi: Bioskop[])=> {
      this.bioskopi = bioskopi;
     });

     this.prijavaServis.getBioskope().subscribe((bioskopi: Bioskop[])=> {
      this.bioskopi = bioskopi;
     });

     this.prijavaServis.getFimab().subscribe((fimab: FImaB[])=> {
      let max = 0;
      for(let i=0; i<fimab.length; i++) {
        if(fimab[i].id > max) max = fimab[i].id;
      } 
      this.id = max+1;
     });

  }

  datum: string;
  vreme: string;
  sala: string;
  cena: string;
  rezBioskopi: Bioskop[];
  uspesno: boolean;
  film: string;
  filmovi: Film[];
  bioskopi: Bioskop[];
  id: number;


  changeStatus(event:Event, obj){
    const isChecked = (<HTMLInputElement>event.target).checked;
    if(isChecked == true) {
      this.rezBioskopi.push(obj);
    }
    //console.log(obj);
  }
 
  onChangeFilm() {
    //console.log(this.film);
  }

  prijava() {
    let brojac = 0;
    
    for(let i=0; i<this.rezBioskopi.length; i++) {
      this.prijavaServis.getFilmPoNazivu(this.film).subscribe((film:Film)=> {
        let idF = film.idF;
        this.prijavaServis.addFimab(this.id,this.rezBioskopi[i].idB,idF,this.datum,this.vreme,this.sala,this.cena).subscribe(()=> {
          brojac++;
          if(brojac == this.rezBioskopi.length - 1) {
            this.uspesno = true;
          }
        });
      });
     
    }
    this.uspesno = true;
  }



}
