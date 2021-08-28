import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletsDetailsComponent } from './outlets-details.component';

describe('OutletsDetailsComponent', () => {
  let component: OutletsDetailsComponent;
  let fixture: ComponentFixture<OutletsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
