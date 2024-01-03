import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertMessageInterface } from '../interfaces/alert-message.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageHandlerService {

  alertMessageSubject: Subject<AlertMessageInterface> = new Subject<AlertMessageInterface>();
  constructor() { }
}
