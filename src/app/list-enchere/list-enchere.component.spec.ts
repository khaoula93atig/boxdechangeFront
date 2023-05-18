import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnchereComponent } from './list-enchere.component';

describe('ListEnchereComponent', () => {
  let component: ListEnchereComponent;
  let fixture: ComponentFixture<ListEnchereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEnchereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnchereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
