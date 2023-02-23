import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrviNavbarComponent } from './prvi-navbar.component';

describe('PrviNavbarComponent', () => {
  let component: PrviNavbarComponent;
  let fixture: ComponentFixture<PrviNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrviNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrviNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
