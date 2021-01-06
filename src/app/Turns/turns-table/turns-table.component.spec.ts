import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsTableComponent } from './turns-table.component';

describe('TurnsTableComponent', () => {
  let component: TurnsTableComponent;
  let fixture: ComponentFixture<TurnsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
