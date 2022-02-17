import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from "../../../shared/authentication-service";

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})

export class Login2Page implements OnInit {
  
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public navCtrl: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}
  admin="admin@admin.com"
  pwdAdmin="admin"

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified && email.value!==this.admin) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['verify-email']); 
          return false;
        }
      }).catch((err) => {
        console.log(` failed ${err}`);
      })
        if(email.value==false){
          this.presentToast("Veuillez entrer un e-mail.",  'bottom', 5000); // this is toastController
        }
        else if (password.value==false){
          this.presentToast("Veuillez entrer un mot de passe.",  'bottom', 5000); // this is toastController
        }
        else if (email.value==this.admin && password.value==this.pwdAdmin){
          this.router.navigate(['admin-panel']); 
        }
  }
  

  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }
      goToRegister() {
        this.navCtrl.navigateForward('/registration');
      }
      goToResetPassword(){
        this.navCtrl.navigateForward('/reset');

      }

}