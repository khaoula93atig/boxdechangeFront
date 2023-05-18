import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnchereComponent } from './form-enchere.component';

describe('FormEnchereComponent', () => {
  let component: FormEnchereComponent;
  let fixture: ComponentFixture<FormEnchereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEnchereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEnchereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
