import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { PrijavaService } from '../servers/prijava.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private prijavaServis: PrijavaService, private router: Router) { }

  @ViewChild('Image') imgType:ElementRef;

  ngOnInit(): void {
    this.ime = '';
    this.prezime = '';
    this.korIme = '';
    this.lozinka = '';
    this.poruka = '';
    this.grad = '';
    this.datumRodjenja = '';
    this.telefon = '';
    this.potvrdaLoz = '';
    this.email = '';
    this.brojLicence = '';
    this.width = 0;
    this.height = 0;
    this.captcha = '';
    this.tip = '';

    this.prijavaServis.getKorisnike().subscribe((korisnici: Korisnik[])=> {
      this.korisnici = korisnici;
    });
  }

  ime: string;
  prezime: string;
  korIme: string;
  grad: string;
  datumRodjenja: string;
  telefon: string;
  lozinka: string;
  potvrdaLoz: string;
  email: string;
  poruka: string;
  brojLicence: string;
  width:number;
  height:number;
  korisnici: Korisnik[];
  captcha: string;
  agencija: string;
  tip:string;

  ngAfterViewInit() {
   // console.log(this.imgType.nativeElement.offsetWidth);
  //console.log(this.imgType.nativeElement.offsetHeight);
  }

  fileChangeEvent(fileInput: any) {
    const Img = new Image();

    const filesToUpload = (fileInput.target.files);
    Img.src = URL.createObjectURL(filesToUpload[0]);

    Img.onload = (e: any) => {
      this.height = e.path[0].height;
      this.width = e.path[0].width;
    }
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    //alert(this.captcha);
  }

  prijava(Image) {
    let format = Image.value.split(".");
    let slika = Image.value.split("\\");
    //alert(slika[2]);
    //alert(this.width);
    if(this.ime == '' || this.prezime == '' || this.korIme == '' || this.grad == '' || this.datumRodjenja == '' || this.telefon == '' || this.lozinka == '' || this.potvrdaLoz == '' || this.email == '') {
      this.poruka = 'Popunite sva polja!';
      return false;
    }
    for(let i=0;i<this.korisnici.length;i++) {
      if(this.korisnici[i].korIme == this.korIme) {
        this.poruka = 'Korisničko ime zazueto!';
        return false;
      }
    }
    if(this.ime.length<3) {
      this.poruka = 'Ime mora sadržati bar 3 slova!';
      return false;
    }
    if(this.prezime.length<3) {
      this.poruka = 'Prezime mora sadržati bar 3 slova!';
      return false;
    }
    if(/^\d\d\d\d-\d\d-\d\d$/.test(this.datumRodjenja) == false) {
      this.poruka = 'Unesite datum u formatu: gggg-mm-dd';
      return false;
    }
    let godina = parseInt(this.datumRodjenja.split('-')[0]);
    let mesec = parseInt(this.datumRodjenja.split('-')[1]);
    let dan = parseInt(this.datumRodjenja.split('-')[2]);
    if(godina > 2022) {
      this.poruka = 'Unesite validnu godinu!';
      return false;
    }
    if(mesec==0 || mesec>12) {
      this.poruka = 'Unesite validan mesec za godinu!';
      return false;
    }
    if(dan==0 || dan>31) {
      this.poruka = 'Unesite validan dan za godinu!';
      return false;
    }
    if(/^\d\d\d-\d\d\d-\d{3,4}$/.test(this.telefon) == false) {
      this.poruka = 'Unesite telefon u formatu: xxx-xxx-xxx(x)';
      return false;
    }
    if(this.lozinka.length < 8) {
      this.poruka = 'Lozinka mora sadržati bar 8 karaktera!';
      return false;
    }
    if(/[a-z]/.test(this.lozinka) == false) {
      this.poruka = 'Lozinka mora počinjati slovom!';
      return false;
    }
    if(/[A-Z]/.test(this.lozinka) == false) {
      this.poruka = 'Lozinka mora sadržati bar 1 veliko slovo!';
      return false;
    }
    if(/[\d{+}]/.test(this.lozinka) == false) {
      this.poruka = 'Lozinka mora sadržati bar 1 broj!';
      return false;
    }
    if(/[^a-zA-Z\d]/.test(this.lozinka) == false ) {
      this.poruka = 'Lozinka mora sadržati bar 1 specijalan karakter!'
      return false;
    }
    if(this.lozinka != this.potvrdaLoz) {
      this.poruka = 'Pogrešna potvrda lozinke!';
      return false;
    }
    for(let i=0;i<this.korisnici.length;i++) {
      if(this.korisnici[i].email == this.email) {
        this.poruka = 'Već postoji nalog za zadatu e-mail adresu!';
        return false;
      }
    }
    if(/\w@\w/.test(this.email) == false) {
      this.poruka = 'Unesite validan mejl sa @!';
      return false;
    }
    if(Image.value == '') {
      this.poruka = 'Unesite vašu sliku!';
      return false;
    }
    if(format[1] != 'png' && format[1] != 'jpg') {
      this.poruka = 'Dozvoljen format slike je jpg ili png!';
      return false;
    }
    if(this.width > 300 || this.height > 300 || this.width < 100 || this.height < 100) {
      this.poruka = 'Dimenzije slike moraju biti veće od 100x100 i manje od 300x300!';
      return false;
    }
    if(this.captcha != '') {
      this.tip = 'korisnik';
      this.prijavaServis.registracija(this.ime,this.prezime,this.korIme,this.lozinka,this.grad,this.datumRodjenja,this.telefon,this.email, this.tip, slika[2],"ne").subscribe((korisnici: Korisnik[])=> {
        this.router.navigate(['/']);
      });
      return true;
    }
    return false;
}
}
