import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolamientoComponent } from './enrolamiento.component';

describe('EnrolamientoComponent', () => {
  let component: EnrolamientoComponent;
  let fixture: ComponentFixture<EnrolamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
