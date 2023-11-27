import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatDashboardComponent } from './achat-dashboard.component';

describe('AchatDashboardComponent', () => {
  let component: AchatDashboardComponent;
  let fixture: ComponentFixture<AchatDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchatDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
