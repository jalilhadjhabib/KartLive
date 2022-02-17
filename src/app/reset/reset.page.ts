import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  email:string;
  password = '';
  error = '';
  username = '';
  image: number;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  recover(email) {
    this.fireauth.sendPasswordResetEmail(email.value)
      .then(data => {
        console.log(data);
        this.presentToast('E-mail de réinitialisation du mot de passe envoyé',  'bottom', 5000); // this is toastController
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        this.presentToast("Désolé, nous n'avons pas pu trouver votre compte.",  'bottom', 5000); // this is toastController
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }
  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }

}