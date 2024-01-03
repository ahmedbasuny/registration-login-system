import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageHandlerService } from 'src/app/core/handlers/storage-handler.service';
import { registerResponseInterface } from 'src/app/core/interfaces/rest-api-response.interface';
import { AlertMessageHandlerService } from 'src/app/core/handlers/alert-message-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  subscription = new Subscription();

  constructor(private authService: AuthService,
    private router: Router,
    private storageHandlerService: StorageHandlerService,
    private alertMessageHandlerService: AlertMessageHandlerService) { }

ngOnInit(): void {
  this.buildregisterForm();
}

buildregisterForm(): void {
  this.registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
}

public getCtr(controlName: string): AbstractControl {
  return this.registerForm.controls[controlName];
}

onRegister() {
  if (this.registerForm.valid) {
    this.subscription.add(
      this.authService.register(this.registerForm.value).subscribe((res: registerResponseInterface) => {
        if(res){
          console.log(res.message);
          let alertMessage = {
            message: res.message,
            isSuccess: true
          };
          this.alertMessageHandlerService.alertMessageSubject.next(alertMessage);
          this.router.navigate(['auth/login']);
        }
      },
      error => {
        let alertMessage = {
          message: "user is already registered.",
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
