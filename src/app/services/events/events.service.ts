import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NotificationService } from 'shared/notification.service';
import MyEvent from '../../models/myEvent';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  
  private dbPath = '/events';

  eventsRef: AngularFireList<MyEvent> = null;

  constructor(
    private db: AngularFireDatabase,
    public notiService: NotificationService,
    public alertController: AlertController


  ) {
    this.eventsRef = db.list(this.dbPath);
  }
 


  async DeleteAlert(event: MyEvent): Promise<any> {
	  const alert = await this.alertController.create({
		cssClass: 'my-custom-class',
		mode: 'ios',
		header: 'Supprimer',
		message: "Voulez-vous supprimer toutes les réservations ?",
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
        this.notiService.presentToast("Réservations supprimées avec succès. ", 4000, 'danger');
			  this.db.list(this.dbPath).remove();
			}
		  },
		]
	  });
  
	  await alert.present();
	}













  addEvent(event: MyEvent): any {
    return this.eventsRef.push(event);
  }

  getAll(): AngularFireList<MyEvent> {
    return this.eventsRef;
  }

}
