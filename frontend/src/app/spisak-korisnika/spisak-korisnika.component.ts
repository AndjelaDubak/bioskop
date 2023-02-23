import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-spisak-korisnika',
  templateUrl: './spisak-korisnika.component.html',
  styleUrls: ['./spisak-korisnika.component.css']
})
export class SpisakKorisnikaComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router: Router) {
    this.korisnici = [];
   }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(sessionStorage.getItem('ulogovan'));
    this.prijavaServis.getKorisnike().subscribe((korisnici:Korisnik[])=>{
      this.izbaciMene(korisnici);
      this.korisnici = korisnici;
    })
  }

  korisnici: Korisnik[];
  ulogovan: Korisnik;

  izbaciMene(kor) {
    for(let i=0; i<kor.length;i++) {
      if(kor[i].korIme == this.ulogovan.korIme) {
        kor.splice(i,1);
      }
    }
  }

  prihvati(korisnik) {
    this.prijavaServis.prihvatiKorisnika(korisnik.korIme).subscribe((ok:String)=>{
      this.prijavaServis.getKorisnike().subscribe((korisnici:Korisnik[])=>{
        this.izbaciMene(korisnici);
        this.korisnici = korisnici;
      })
    })
  }

  obrisi(n) {
    this.prijavaServis.deleteKorisnik(n.korIme).subscribe((ok:String)=>{
      this.prijavaServis.getKorisnike().subscribe((korisnici:Korisnik[])=>{
        this.izbaciMene(korisnici);
        this.korisnici = korisnici;
      })
    })
  }

  unapredi(korisnik) {
    this.prijavaServis.unaprediKorisnika(korisnik.korIme).subscribe((ok:String)=>{
      this.prijavaServis.getKorisnike().subscribe((korisnici:Korisnik[])=>{
        this.izbaciMene(korisnici);
        this.korisnici = korisnici;
      })
    })
  }

}
