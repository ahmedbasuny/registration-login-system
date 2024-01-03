import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ValidationsMsgComponent } from './components/validations-msg/validations-msg.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

@NgModule({
  declarations: [ValidationsMsgComponent, AlertMessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    ValidationsMsgComponent,
    AlertMessageComponent
  ]
})
export class SharedModule { }
