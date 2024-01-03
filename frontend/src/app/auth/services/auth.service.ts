import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageHandlerService } from 'src/app/core/handlers/storage-handler.service';
import { UserDataInterface } from 'src/app/core/interfaces/user-data.interface';
import { Observable } from 'rxjs';
import { loginResponseInterface, registerResponseInterface } from 'src/app/core/interfaces/rest-api-response.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.baseUrl}/api/v1/auth`;

  constructor(private http: HttpClient, private storageHandlerService: StorageHandlerService) { }

  login(payload: UserDataInterface): Observable<any>{
    return this.http.post<loginResponseInterface>(`${this.baseUrl}/login`, payload);
  }

  register(payload: UserDataInterface): Observable<any>{
    return this.http.post<registerResponseInterface>(`${this.baseUrl}/register`, payload);
  }

  isLoggedIn(){
    const TOKEN = this.storageHandlerService.getItem(localStorage, 'token')
    return !!this.storageHandlerService.getItem(localStorage, 'token');
  }

  getUserAuthData(): UserDataInterface{
    const TOKEN = this.storageHandlerService.getItem(localStorage, 'token')
    const PARSED_TOKEN = JSON.parse(atob(TOKEN?.split(".")[1]));
    const USER_DATA = {
      email: PARSED_TOKEN?.sub,
      firstName: PARSED_TOKEN?.sub,
      lastName: PARSED_TOKEN?.sub,

    }
    return USER_DATA;
  }
}
