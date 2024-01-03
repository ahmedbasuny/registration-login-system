import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageHandlerService } from 'src/app/core/handlers/storage-handler.service';
import { loginResponseInterface } from 'src/app/core/interfaces/rest-api-response.interface';
import { AlertMessageHandlerService } from 'src/app/core/handlers/alert-message-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscription = new Subscription();

  constructor(private authService: AuthService,
    private router: Router,
    private storageHandlerService: StorageHandlerService,
    private alertMessageHandlerService: AlertMessageHandlerService) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  public getCtr(controlName: string): AbstractControl {
    return this.loginForm.controls[controlName];
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.subscription.add(
        this.authService.login(this.loginForm.value).subscribe((res: loginResponseInterface) => {
          if (res.access_token) {
            let alertMessage = {
              message: "logged in successfully",
              isSuccess: true
            };
            this.alertMessageHandlerService.alertMessageSubject.next(alertMessage);
            console.log('login success');
            this.storageHandlerService.setItem(localStorage, 'token', res.access_token);
            this.router.navigate(['']);
          }
        },
          error => {
            let alertMessage = {
              message: "error in email or password",
              isSuccess: false
            };
            this.alertMessageHandlerService.alertMessageSubject.next(alertMessage);
          })

      )
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
