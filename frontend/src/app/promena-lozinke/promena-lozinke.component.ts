import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router:Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
    this.stara = '';
    this.nova = '';
    this.potvrda = '';
    this.poruka = '';
    this.uspesno = false;
  }

  korisnik: Korisnik;
  stara: string;
  nova: string;
  potvrda: string;
  poruka:string;
  uspesno: boolean;

  promenaLozinke() {
    this.prijavaServis.prijava(this.korisnik.korIme).subscribe((kor: Korisnik)=>{
      if(this.stara == '' || this.nova == '' || this.potvrda == '') {
        this.poruka = 'Popunite sva polja!';
        return false;
      }
      if(kor.lozinka != this.stara) {
        this.poruka = "Trenutna lozinka pogrešna!";
        return false;
      }
      if(this.nova.length < 8) {
        this.poruka = 'Lozinka mora sadržati bar 8 karaktera!';
        return false;
      }
      if(/[a-z]/.test(this.nova) == false) {
        this.poruka = 'Lozinka mora počinjati slovom!';
        return false;
      }
      if(/[A-Z]/.test(this.nova) == false) {
        this.poruka = 'Lozinka mora sadržati bar 1 veliko slovo!';
        return false;
      }
      if(/[\d{+}]/.test(this.nova) == false) {
        this.poruka = 'Lozinka mora sadržati bar 1 broj!';
        return false;
      }
      if(/[^a-zA-Z\d]/.test(this.nova) == false ) {
        this.poruka = 'Lozinka mora sadržati bar 1 specijalan karakter!'
        return false;
      }
      if(this.nova != this.potvrda) {
        this.poruka = 'Pogrešna potvrda lozinke!';
        return false;
      }
      this.prijavaServis.promenaLozinke(this.korisnik.korIme,this.nova).subscribe((kor:Korisnik)=>{
        sessionStorage.removeItem('ulogovan');
        this.poruka = '';
        this.uspesno = true;
      });
      return true;
    });
  }

}
