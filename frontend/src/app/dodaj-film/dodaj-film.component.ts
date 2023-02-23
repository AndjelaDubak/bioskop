import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../models/film';
import { Korisnik } from '../models/korisnik';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-dodaj-film',
  templateUrl: './dodaj-film.component.html',
  styleUrls: ['./dodaj-film.component.css']
})
export class DodajFilmComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router: Router) { }

  @ViewChild('Image') imgType:ElementRef;

  ngOnInit(): void {
    this.naziv = '';
    this.datumPocetka= '';
    this.trajanje = '';
    this.trejler = '';
    this.sadrzaj = '';
    this.glumci = '';
    this.reziser = '';
    this.godIzlaska = '';
    this.slika = '';
    this.zanr = [];
    this.uspesno = false;

    this.prijavaServis.getFilmove().subscribe((filmovi: Film[])=> {
      let max = 0;
      for(let i=0; i<filmovi.length; i++) {
        if(filmovi[i].idF > max) max = filmovi[i].idF;
      } 
      this.idF = max+1;
    });
    
  }

  idF: number;
  naziv: string;
  datumPocetka: string;
  trajanje: string;
  trejler: string;
  sadrzaj: string;
  glumci: string;
  reziser: string;
  godIzlaska: string;
  slika: string;
  zanr: string[];
  uspesno: boolean;

  changeStatus(event:Event, obj){
    const isChecked = (<HTMLInputElement>event.target).checked;
    if(isChecked == true) {
      this.zanr.push(obj.id);
    }
    console.log(obj.id);
  }

  prijava(Image) {
    let slika = Image.value.split("\\");
    let yt = this.trejler.split('=');
    let kod = yt[1].split('&');
    let trejler = "https://www.youtube.com/embed/" + kod[0];
    this.prijavaServis.addFilm(this.idF,this.naziv,this.datumPocetka,this.trajanje,trejler,this.sadrzaj,this.glumci,this.reziser,this.godIzlaska, slika[2], this.zanr).subscribe((film: Film[])=> {
      this.uspesno = true;
    });
  }
}
