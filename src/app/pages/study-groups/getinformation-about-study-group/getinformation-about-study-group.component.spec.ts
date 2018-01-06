import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetinformationAboutStudyGroupComponent } from './getinformation-about-study-group.component';

describe('GetinformationAboutStudyGroupComponent', () => {
  let component: GetinformationAboutStudyGroupComponent;
  let fixture: ComponentFixture<GetinformationAboutStudyGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetinformationAboutStudyGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetinformationAboutStudyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
