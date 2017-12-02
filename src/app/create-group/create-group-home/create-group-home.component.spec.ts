import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupHomeComponent } from './create-group-home.component';

describe('CreateGroupHomeComponent', () => {
  let component: CreateGroupHomeComponent;
  let fixture: ComponentFixture<CreateGroupHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGroupHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
