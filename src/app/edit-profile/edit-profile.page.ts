import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthenticationService } from "../../../shared/authentication-service";
import { NotificationService }from "../../../shared/notification.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profileEditForm: FormGroup;
  showForgotPassword: boolean = true;

  constructor(public navCtrl: NavController,
    public modalController: ModalController,
    public authService: AuthenticationService,
    public alertController: AlertController,
    public notiService: NotificationService,
    ) { }

  ngOnInit() {
    this.loadFormData();
  }
  loadFormData() {
    this.profileEditForm = new FormGroup({
      'displayName': new FormControl(this.authService.userData.displayName),
      'email': new FormControl(this.authService.userData.email, [Validators.email]),
    });
  }

  async onSubmit() {
    const alert = await this.alertController.create({
      header: 'Entez votre mot de passe pour confirmer',
      inputs: [
        {
          name: 'password',
          placeholder: 'Mot de passe',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmer',
          handler: (data) => {
            this.authService.UpdateProfile(
              this.profileEditForm.value.email,
              this.profileEditForm.value.displayName,
              data.password,
            ).then(() => {
              window.location.assign('/');
              this.closeProfileEditModal();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  closeProfileEditModal() {
    this.modalController.dismiss();
  }
  goToResetPassword(){
    this.navCtrl.navigateForward('/reset');

  }

}
