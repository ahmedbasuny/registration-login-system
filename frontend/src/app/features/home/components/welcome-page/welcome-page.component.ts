import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDataInterface } from 'src/app/core/interfaces/user-data.interface';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  userData: UserDataInterface;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserData();

  }

  getUserData(){
    this.userData = this.authService.getUserAuthData();
  }

}
