import { Component } from '@angular/core';
import { AuthenticationService } from "../../shared/authentication-service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(public authService: AuthenticationService,
    ) 
    {
      
    }
    accountPages = [
      {
         title: 'Log In',
         url: '/auth/login',
         ionicIcon: 'log-in-outline',
      },
      {
         title: 'Sign Up',
         url: '/auth/signup',
         ionicIcon: 'person-add-outline',
      },]
}
