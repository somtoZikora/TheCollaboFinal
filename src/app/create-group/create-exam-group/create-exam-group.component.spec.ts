import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamGroupComponent } from './create-exam-group.component';

describe('CreateExamGroupComponent', () => {
  let component: CreateExamGroupComponent;
  let fixture: ComponentFixture<CreateExamGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExamGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExamGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
