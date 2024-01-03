import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertMessageHandlerService } from 'src/app/core/handlers/alert-message-handler.service';
import { AlertMessageInterface } from 'src/app/core/interfaces/alert-message.interface';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  alertMessage: AlertMessageInterface;
  showAlert: boolean = false;
  subscription = new Subscription();

  constructor(private alertMeassgeHandlerService: AlertMessageHandlerService) { }

  ngOnInit(): void {
    this.getAlertMessageData();
  }

  getAlertMessageData() {
    this.subscription.add(
      this.alertMeassgeHandlerService.alertMessageSubject.subscribe( (res: AlertMessageInterface) => {
        this.alertMessage = res;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
