import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UskoroComponent } from './uskoro.component';

describe('UskoroComponent', () => {
  let component: UskoroComponent;
  let fixture: ComponentFixture<UskoroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UskoroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UskoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
