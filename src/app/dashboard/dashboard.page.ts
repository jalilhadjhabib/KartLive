import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from "../../../shared/authentication-service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {


  pages = [
    {
      title: 'FAQ',
      url: '/dashboard/faq'
    },
    {
      title: 'Contactez-nous',
      url: '/dashboard/contact'
    },
    {
      title: 'Mentions légales',
      url: '/dashboard/terms2'
    },{
      title: 'Politique de confidentialité',
      url: '/dashboard/privacy2'
    },
    {
      title: 'A propos',
      url: '/dashboard/fb'
    },
    /*{
      title: 'pdf',
      url: '/dashboard/pdf'
    },*/
  ];

  selectedPath = '';


  constructor(
    public authService: AuthenticationService,
    public router: Router,  

  ) { 
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }
  gototest(){
    this.router.navigate(['dashboard']);

  }

}