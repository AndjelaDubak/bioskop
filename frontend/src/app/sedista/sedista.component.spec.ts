import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedistaComponent } from './sedista.component';

describe('SedistaComponent', () => {
  let component: SedistaComponent;
  let fixture: ComponentFixture<SedistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
