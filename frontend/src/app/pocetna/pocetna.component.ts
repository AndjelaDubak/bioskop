import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../models/film';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router: Router, private cdRef:ChangeDetectorRef) { 
    this.filmovi = [];
    this.buduciFilmovi = [];
  }

  ngOnInit(): void {

    this.prijavaServis.getFilmove().subscribe((filmovi:Film[])=>{
      this.filmovi = filmovi;
      let brFilmova = 0;
      let trenutni = new Date();
      for(let i=0; i<this.filmovi.length; i++) {
        let datumPocetka = this.filmovi[i].datumPocetka.split('.');
        let dan = parseInt(datumPocetka[0]);
        let mesec = parseInt(datumPocetka[1]);
        let godina = parseInt(datumPocetka[2]);
        if(godina > trenutni.getFullYear() || (godina == trenutni.getFullYear() && mesec > trenutni.getMonth() + 1) ||
        (godina == trenutni.getFullYear() && mesec == trenutni.getMonth() + 1 && dan > trenutni.getDate())) {
          this.buduciFilmovi[brFilmova++] = this.filmovi[i];
        }
      }
    })
  }

  filmovi: Film[];
  buduciFilmovi: Film[];

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
    this.cdRef.detectChanges();
  }

  otvoriFilm(broj) {
    sessionStorage.setItem('film', JSON.stringify(this.buduciFilmovi[broj]));
    this.router.navigate(['/film']);
  }

}
