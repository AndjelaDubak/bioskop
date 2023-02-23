import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioskopiComponent } from './bioskopi/bioskopi.component';
import { DodajFilmComponent } from './dodaj-film/dodaj-film.component';
import { DodajProjekcijeComponent } from './dodaj-projekcije/dodaj-projekcije.component';
import { FilmComponent } from './film/film.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RepertoarBioskopaComponent } from './repertoar-bioskopa/repertoar-bioskopa.component';
import { RepertoarComponent } from './repertoar/repertoar.component';
import { SedistaComponent } from './sedista/sedista.component';
import { SpisakKorisnikaComponent } from './spisak-korisnika/spisak-korisnika.component';
import { UskoroComponent } from './uskoro/uskoro.component';

const routes: Routes = [
  {path:'', component:PocetnaComponent},
  {path:'pocetna', component:PocetnaComponent},
  {path:'prijava', component:PrijavaComponent},
  {path:'registracija', component:RegistracijaComponent},
  {path:'repertoar', component:RepertoarComponent},
  {path:'promenaLozinke', component:PromenaLozinkeComponent},
  {path:'film', component:FilmComponent},
  {path:'bioskopi', component:BioskopiComponent},
  {path:'spisakKorisnika', component:SpisakKorisnikaComponent},
  {path:'uskoro', component:UskoroComponent},
  {path:'sedista', component:SedistaComponent},
  {path:'dodajFilm', component:DodajFilmComponent},
  {path:'dodajProjekcije', component:DodajProjekcijeComponent},
  {path:'repertoarBioskopa', component:RepertoarBioskopaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
