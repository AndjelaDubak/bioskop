import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { FooterComponent } from './footer/footer.component';
import { RepertoarComponent } from './repertoar/repertoar.component';
import { PrviNavbarComponent } from './prvi-navbar/prvi-navbar.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { FilmComponent } from './film/film.component';
import { BioskopiComponent } from './bioskopi/bioskopi.component';
import { SafePipe } from './safe.pipe';
import { SpisakKorisnikaComponent } from './spisak-korisnika/spisak-korisnika.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UskoroComponent } from './uskoro/uskoro.component';
import { SedistaComponent } from './sedista/sedista.component';
import { DodajFilmComponent } from './dodaj-film/dodaj-film.component';
import { DodajProjekcijeComponent } from './dodaj-projekcije/dodaj-projekcije.component';
import { RepertoarBioskopaComponent } from './repertoar-bioskopa/repertoar-bioskopa.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    PrijavaComponent,
    RegistracijaComponent,
    FooterComponent,
    RepertoarComponent,
    PrviNavbarComponent,
    PromenaLozinkeComponent,
    FilmComponent,
    BioskopiComponent,
    SafePipe,
    SpisakKorisnikaComponent,
    NavbarComponent,
    UskoroComponent,
    SedistaComponent,
    DodajFilmComponent,
    DodajProjekcijeComponent,
    RepertoarBioskopaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
