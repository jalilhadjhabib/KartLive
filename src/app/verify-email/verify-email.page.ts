import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'shared/notification.service';
import { AuthenticationService } from "../../../shared/authentication-service";
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  allowResend: boolean = false
  count: number = 60
  constructor(
    public authService: AuthenticationService,
    public notiService: NotificationService,
    private toastController: ToastController,
    public navCtrl: NavController,
    public alertController: AlertController,
    public modalController: ModalController,

  ) { }

  ngOnInit() {
    this.coolDownTimer();
  }

  resendVerification() {
    this.authService.SendVerificationMail();
    this.presentToast("Nous avons envoyé un email de confirmation a votre boîte mail.",  'bottom', 5000); // this is toastController
    this.coolDownTimer();
  }

  coolDownTimer() {
    this.allowResend = false;
    const counter = interval(1000).pipe(take(60));
    counter.subscribe((x) => {
      this.count -= 1;
    }, (error) => {
      this.notiService.presentToast(error, 4000, 'danger');
    }, () => {
      this.allowResend = true;
      this.count = 60;
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
  
  closeUserEditModal() {
    this.modalController.dismiss();
  }
  async openProfileEditModal() {
    const modal = await this.modalController.create({
      component: EditProfilePage,
    });
    return await modal.present();
  }
}
