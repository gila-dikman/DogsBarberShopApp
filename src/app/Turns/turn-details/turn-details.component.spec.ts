import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnDetailsComponent } from './turn-details.component';

describe('TurnDetailsComponent', () => {
  let component: TurnDetailsComponent;
  let fixture: ComponentFixture<TurnDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
