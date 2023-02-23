import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bioskop } from '../models/bioskop';
import { Film } from '../models/film';
import { Korisnik } from '../models/korisnik';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-uskoro',
  templateUrl: './uskoro.component.html',
  styleUrls: ['./uskoro.component.css']
})
export class UskoroComponent implements OnInit {

    constructor(private prijavaServis: PrijavaService, private router: Router, private cdRef:ChangeDetectorRef) { 
        this.filmovi = [];
      }
    
      ngOnInit(): void {
        this.prijavaServis.getFilmove().subscribe((filmovi:Film[])=>{
          let brFilmova = 0;
          let trenutni = new Date();
          for(let i=0; i<filmovi.length; i++) {
            let datumPocetka = filmovi[i].datumPocetka.split('.');
            let dan = parseInt(datumPocetka[0]);
            let mesec = parseInt(datumPocetka[1]);
            let godina = parseInt(datumPocetka[2]);
            if(godina > trenutni.getFullYear() || (godina == trenutni.getFullYear() && mesec > trenutni.getMonth() + 1) ||
            (godina == trenutni.getFullYear() && mesec == trenutni.getMonth() + 1 && dan > trenutni.getDate())) {
              this.filmovi[brFilmova++] = filmovi[i];
            }
          }
          this.korisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
        })
      }
    
      filmovi: Film[];
      korisnik: Korisnik;
    
      odjava() {
        sessionStorage.removeItem('ulogovan');
      }
    
      otvoriFilm(film) {
        sessionStorage.setItem('film',JSON.stringify(film));
        this.router.navigate(['/film']);
      }

}
