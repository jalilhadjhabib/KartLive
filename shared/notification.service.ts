import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public toastController: ToastController,
  ) { }

  async presentToast(message: string, duration: number, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color,
      position: 'top',
    });
    toast.present();
  }
}
