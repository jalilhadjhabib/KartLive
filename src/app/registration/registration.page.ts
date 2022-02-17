import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from "../../../shared/authentication-service";
import $ from "jquery";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public navCtrl: NavController,
    public toastController: ToastController,
  ) { 
    
  }

  ngOnInit(){$('#password, #confirm_password').on('keyup', function () {
    if ($('#password').val() == $('#confirm_password').val()) {
      $('#message').html('').css('color', 'green');
    } else 
      $('#message').html('Vos mots de passes ne corresepondent pas. Veuillez réessayer').css('color', 'red');
  });}

signUp(email, password){
      this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        
      })
      if(email.value==false){
        this.presentToast("Veuillez entrer un e-mail.",  'bottom', 5000); // this is toastController
      }
      else if (password.value==false){
        this.presentToast("Veuillez entrer un mot de passe.",  'bottom', 5000); // this is toastController
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
  goToLogin2() {
    this.navCtrl.navigateForward('/login2');
  }

}