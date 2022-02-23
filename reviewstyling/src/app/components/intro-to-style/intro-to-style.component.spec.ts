import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroToStyleComponent } from './intro-to-style.component';

describe('IntroToStyleComponent', () => {
  let component: IntroToStyleComponent;
  let fixture: ComponentFixture<IntroToStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroToStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroToStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
