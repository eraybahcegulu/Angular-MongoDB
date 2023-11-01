import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBarComponent } from './teacher-bar.component';

describe('TeacherBarComponent', () => {
  let component: TeacherBarComponent;
  let fixture: ComponentFixture<TeacherBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherBarComponent]
    });
    fixture = TestBed.createComponent(TeacherBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
