import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ServicesService } from '../services/services.service';
import { NotificationService } from 'shared/notification.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.page.html',
  styleUrls: ['./edit-image.page.scss'],
})
export class EditImagePage implements OnInit {
  @ViewChild('imageProd') inputimageProd: ElementRef;
  id: any;
  uid: string;
  img: any;
  urlImage: Observable<string>;

  cp: Boolean;

  constructor(private rout: Router,
    private route: ActivatedRoute,
    private services: ServicesService,
    private afs: AngularFireStorage,
    private loadingController: LoadingController,
    private aut: AngularFireAuth,
    public notiService: NotificationService,
    ) {
  }

  ngOnInit() {
    this.logueado();
  }




  logueado() {
    this.aut.authState
      .subscribe(
        user => {
          if (user) {
            this.uid = user.uid;
            this.getProfile(this.uid);
          }
        });
  }

  async getProfile(id) {
    await this.services.getProfile(id).subscribe((data: any) => {
      console.log(data);
      if (data.length !== 0) {
        this.cp = true;
        this.id = data[0].payload.doc.id;
        this.img = data[0].payload.doc.data().img;
        console.log('profil full');
      } else {
        this.cp = false;
        console.log('profile empty');
      }

    });
  }


  onUpload(e) {
    console.log(e.target.files[0]);

    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `image/pic_${id}`;
    const ref = this.afs.ref(filePath);
    const task = this.afs.upload(filePath, file);
    this.presentLoading();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }


  save() {
    console.log(this.cp);
    const image = this.inputimageProd.nativeElement.value;
    const data = {
      img: image || this.img,
      uid: this.uid,
    };
    console.log(data);
    if (this.cp === false) {
      this.services.createUser(data).then(
        res => {
          console.log('Upload' + res);
          this.notiService.presentToast('Votre photo a été mise à jour.', 4000, 'danger');
          this.rout.navigate(['/dashboard/tab3']);
        });
    } else {
      this.services.updateUser(data, this.id).then(
        res => {
          console.log('Upload' + res);
          this.notiService.presentToast('Votre photo a été mise à jour.', 4000, 'danger');
          this.rout.navigate(['/dashboard/tab3']);
        });
    }

  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Chargement de votre image',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
  moveFocus(nextElement) {
    nextElement.setFocus();
  }

}
