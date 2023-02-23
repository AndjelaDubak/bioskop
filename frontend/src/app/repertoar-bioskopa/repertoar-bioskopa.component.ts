import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Bioskop } from '../models/bioskop';
import { Film } from '../models/film';
import { Korisnik } from '../models/korisnik';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-repertoar-bioskopa',
  templateUrl: './repertoar-bioskopa.component.html',
  styleUrls: ['./repertoar-bioskopa.component.css']
})
export class RepertoarBioskopaComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router: Router, private cdRef:ChangeDetectorRef, config: NgbRatingConfig) { 
    config.readonly = true;
    this.filmovi = [];
  }

  ngOnInit(): void {
    let bioskop = JSON.parse(sessionStorage.getItem('bioskop'));

    this.prijavaServis.getBioskopPoNazivu(bioskop.naziv).subscribe((bioskop: Bioskop)=>{
     this.bioskop = bioskop;
      this.prijavaServis.getBioskopPoNazivu(this.bioskop.naziv).subscribe((bioskop: Bioskop)=>{
        let idB = bioskop.idB;
        this.prijavaServis.pretraga(idB, 'svi').subscribe((filmovi:Film[])=>{
          this.filmovi = filmovi;
        })
      })
    })

  }

  bioskop: Bioskop;
  filmovi: Film[];


  otvoriFilm(film) {
    sessionStorage.setItem('film',JSON.stringify(film));
    this.router.navigate(['/film']);
  }


}
