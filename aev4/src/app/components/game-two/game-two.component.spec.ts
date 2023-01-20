import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTwoComponent } from './game-two.component';

describe('GameTwoComponent', () => {
  let component: GameTwoComponent;
  let fixture: ComponentFixture<GameTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
