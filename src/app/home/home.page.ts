import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userEmail:string;
  connected: boolean;
  hasVerifiedEmail: false;
  email:string;
  router: any;

  constructor(public toastController: ToastController,
              public afAuth: AngularFireAuth,public navCtrl: NavController) {
                

    this.afAuth.authState.subscribe(auth => {
      if (!auth) 
      {
        console.log('non connecté');
        this.connected = false;
      } 
      else 
      {
        this.userEmail=auth.email;
        console.log('connecté');
        this.connected = true;
      }
    });
  }
  
  async SendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification()
    .then(() => {
      this.router.navigate(['/terms']);
      console.log('verifié');
    })
  }




}
function sendEmailVerification(email: any) {
  throw new Error('Function not implemented.');
}

