import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajFilmComponent } from './dodaj-film.component';

describe('DodajFilmComponent', () => {
  let component: DodajFilmComponent;
  let fixture: ComponentFixture<DodajFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajFilmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
