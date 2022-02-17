import { ReserveInfoPage } from '../../reserve-info/reserve-info.page';
import { AuthenticationService } from "../../../../shared/authentication-service";
import { Component, OnInit } from '@angular/core';
import { CamposFireBase } from '../../../../shared/campos';
import { AlertController, ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

	id: string
  
	Data: CamposFireBase[]
  
	constructor(
	  private fireBaseService: AuthenticationService,
	  private navCtrl: NavController,
	  public modalController: ModalController,
	  public alertController: AlertController
	) { }
  
	ngOnInit() {
	  this.fireBaseService.GetFireBase().subscribe(
		res => {
		  this.Data = res
		  console.log("GET:", res)
		},
		err => console.log(err))
	}
  
	async DeleteData() {
	  let IdItem = await this.id
	  console.log("ID:", IdItem)
	  this.fireBaseService.DeleteFireBase(IdItem);
	}
  
	async openModalEditPage() {
	  const modal = await this.modalController.create({
		component: ReserveInfoPage,
		cssClass: 'modal-add-data',
		componentProps: {
		  'id': this.id,
		  'type' : 'edit'
		}
	  });
	  return await modal.present();
	}
  
	async openModalAddPage() {
	  const modal = await this.modalController.create({
		component: ReserveInfoPage,
		cssClass: 'modal-add-data',
	  });
	  return await modal.present();
	}
  
	goAddData() {
	  this.navCtrl.navigateForward('/reserve-info')
	}
  
	async DeleteAlert() {
	  const alert = await this.alertController.create({
		cssClass: 'my-custom-class',
		mode: 'ios',
		header: 'Supprimer',
		message: "Voulez-vous supprimer l'élément ?",
		buttons: [
		  {
			text: 'Annuler',
			role: 'cancel',
			cssClass: 'secondary',
			handler: (blah) => {
			  console.log('Confirm Cancel: blah');
			}
		  },
		  {
			text: 'Confirmer',
			handler: () => {
			  console.log('Confirm Okay');
			  this.DeleteData();
			}
		  },
		]
	  });
  
	  await alert.present();
	}
  
  }
  