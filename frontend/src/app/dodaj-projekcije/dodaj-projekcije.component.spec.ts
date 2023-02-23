import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajProjekcijeComponent } from './dodaj-projekcije.component';

describe('DodajProjekcijeComponent', () => {
  let component: DodajProjekcijeComponent;
  let fixture: ComponentFixture<DodajProjekcijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajProjekcijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajProjekcijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
