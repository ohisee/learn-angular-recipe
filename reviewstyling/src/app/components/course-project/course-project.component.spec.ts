import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProjectComponent } from './course-project.component';

describe('CourseProjectComponent', () => {
  let component: CourseProjectComponent;
  let fixture: ComponentFixture<CourseProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
