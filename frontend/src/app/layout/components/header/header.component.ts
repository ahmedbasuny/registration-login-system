import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHandlerService } from 'src/app/core/handlers/storage-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, 
    private storageHandlerService: StorageHandlerService) { }

  ngOnInit(): void {
  }

  logout(){
    this.storageHandlerService.removeItem(localStorage, 'token')
    this.router.navigate(['/auth/login'])
  }

}
