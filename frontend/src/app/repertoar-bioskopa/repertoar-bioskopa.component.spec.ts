import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertoarBioskopaComponent } from './repertoar-bioskopa.component';

describe('RepertoarBioskopaComponent', () => {
  let component: RepertoarBioskopaComponent;
  let fixture: ComponentFixture<RepertoarBioskopaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepertoarBioskopaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepertoarBioskopaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
