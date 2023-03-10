import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  userName:string;
  
  constructor(private dsService: DataStorageService, private authService: AuthService){}
  
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      this.userName = user.displayName;
      console.log(user);
    });
  }

  onSaveData(){
    this.dsService.storeRecipes();
  }

  onFetchData(){
    this.dsService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
