import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'))
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', async() => {
    component.getCtr('email').setValue('ss@ss.com');
    component.getCtr('password').setValue('123');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('form should be invalid', async() => {
    component.getCtr('email').setValue('');
    component.getCtr('password').setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email not email value', async() => {
    component.getCtr('email').setValue('ss@ss.com');
    expect(component.getCtr('email').valid).toBeTruthy();
  });

  it('should call onLogin method', async() => {
    fixture.detectChanges();
    spyOn(component,'onLogin');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onLogin).toHaveBeenCalledTimes(0);
  });

});
