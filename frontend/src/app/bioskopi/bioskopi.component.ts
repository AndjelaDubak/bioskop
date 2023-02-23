import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bioskop } from '../models/bioskop';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-bioskopi',
  templateUrl: './bioskopi.component.html',
  styleUrls: ['./bioskopi.component.css']
})
export class BioskopiComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router: Router) { 
    this.bioskopi = [];
  }

  ngOnInit(): void {
    this.prijavaServis.getBioskope().subscribe((bioskopi:Bioskop[])=>{
      this.bioskopi = bioskopi;
    })
  }

  bioskopi: Bioskop[];

  repertoar(bioskop) {
    sessionStorage.setItem('bioskop', JSON.stringify(bioskop));
    this.router.navigate(['/repertoarBioskopa']);
  }

}
