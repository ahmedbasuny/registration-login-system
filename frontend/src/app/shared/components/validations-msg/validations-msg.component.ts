import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validations-msg',
  templateUrl: './validations-msg.component.html',
  styleUrls: ['./validations-msg.component.scss']
})
export class ValidationsMsgComponent implements OnInit {
  @Input() controller: FormControl;
  @Input() controlName: string;

  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage(): boolean {
    if (this.controller?.errors && (this.controller.touched || this.controller.dirty || this.controller.value)) {
      for (const propertyName in this.controller.errors) {
        return this.getValidationErrorMessage(propertyName);
      }
    }
    return false;
  }

  public getValidationErrorMessage(validatorName: string): any {
    const config: any = {
      required: 'is required',
      invalidPassword: 'is invalid',
      email: 'is invalid',
    };
    return this.controlName + ' ' + config[validatorName];
  }

}
