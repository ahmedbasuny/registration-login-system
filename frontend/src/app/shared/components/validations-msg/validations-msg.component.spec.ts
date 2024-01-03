import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsMsgComponent } from './validations-msg.component';

describe('ValidationsMsgComponent', () => {
  let component: ValidationsMsgComponent;
  let fixture: ComponentFixture<ValidationsMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationsMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
