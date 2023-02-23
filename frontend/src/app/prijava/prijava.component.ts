import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router: Router) { }

  ngOnInit(): void {
    this.korIme = '';
    this.lozinka = '';
    this.poruka = '';
  }

  korIme: string;
  lozinka: string;
  poruka: string;


  prijava() {
    this.prijavaServis.prijava(this.korIme).subscribe((user:Korisnik)=>{
      if(this.korIme=='' && this.lozinka=='') {
        this.poruka = "Popunite sva polja!";
      }
      else if (this.korIme==''){
        this.poruka = "Unesite korisničko ime!";
      }
      else if(this.lozinka=='') {
        this.poruka = "Unesite lozinku!";
      }
      else {
        if(user){
          if(user.lozinka == this.lozinka) {
            if(user.odobren == 'ne') {
              this.poruka = 'Nalog još uvek nije odobren!';
            }
            else {
              sessionStorage.setItem('ulogovan',JSON.stringify(user));
              this.router.navigate(['/pocetna']);
            }
          }
          else {
            this.poruka = 'Pogrešna lozinka!';
          }
        }
        else this.poruka = "Ne postoji korisnik!";
      }      
    })
  }

}
