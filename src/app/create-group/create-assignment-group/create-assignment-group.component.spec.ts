import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignmentGroupComponent } from './create-assignment-group.component';

describe('CreateAssignmentGroupComponent', () => {
  let component: CreateAssignmentGroupComponent;
  let fixture: ComponentFixture<CreateAssignmentGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssignmentGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssignmentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
