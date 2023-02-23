import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-prvi-navbar',
  templateUrl: './prvi-navbar.component.html',
  styleUrls: ['./prvi-navbar.component.css']
})
export class PrviNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('ulogovan'));
  }

  korisnik: Korisnik;

  odjava() {
    sessionStorage.removeItem('ulogovan');
    this.router.navigate(['/prijava']);
  }
}
