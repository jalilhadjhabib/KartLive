import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from "../../../shared/authentication-service";
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { EditImagePage } from '../edit-image/edit-image.page'
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  uid: any;
  item: any;
  anuncios: any;
  empty: Boolean;
  images = [];
  profileName: any;
  profileImageUrl: any;
  profileEmail: any;
  profile: any;
  
  @ViewChild('imageProd') inputimageProd: ElementRef;
  id: any;
  name: any;
  phone: string;
  adress: string;
  img: any;
  mail: string;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  username: string;
  cp: Boolean;

  constructor(public toastController: ToastController,
    public afAuth: AngularFireAuth,public navCtrl: NavController,
    public authService: AuthenticationService,
    public firestore: AngularFirestore,
    public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage,
    public alertController: AlertController,
    public modalController: ModalController,
    public router: Router,
    private rout: Router, 
    private services: ServicesService, 
    private aut: AngularFireAuth,
    private route: ActivatedRoute,
    private afs: AngularFireStorage,
    private loadingController: LoadingController,

    
    ) {
      //this.getImagesDatabase();
      firebase.auth().onAuthStateChanged( user=>{
        console.log("AUTH_USER",user);
  
        if(user) {
          const result = this.firestore.doc('/users/'+user.uid);
          var userprofile = result.valueChanges();
          userprofile.subscribe(profile => {
            console.log ("PROFILE: :", profile);
            this.profileName = profile ['displayName'];
            this.profileImageUrl = profile ['photoURL'];
            this.profileEmail = profile ['email'];
  
  
          })
  
  
        }
      })
    }
    users: Observable<any[]>;


    ngOnInit() {
      this.logueado();
    }
    logueado() {
      this.aut.authState
        .subscribe(
          user => {
            if (user) {
              this.mail = user.email;
              this.uid = user.uid;
              console.log(this.mail);
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
          this.name = data[0].payload.doc.data().name;
          this.phone = data[0].payload.doc.data().phone;
          this.adress = data[0].payload.doc.data().adress;
          this.img = data[0].payload.doc.data().img;
          this.username =  data[0].payload.doc.data().username;
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
      this.uploadPercent = task.percentageChanges();
      this.presentLoading();
      task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    }
  
  
    save(name, phone, adress, username) {
      console.log(this.cp);
      const image = this.inputimageProd.nativeElement.value;
      const data = {
        name: name,
        phone: phone,
        mail: this.mail,
        img: image || this.img,
        adress: adress,
        uid: this.uid,
        username: username || 'null'
      };
      console.log(data);
      if (this.cp === false) {
        this.services.createUser(data).then(
          res => {
            console.log('Upload' + res);
            this.rout.navigate(['/dashboard/tab3']);
          });
      } else {
        this.services.updateUser(data, this.id).then(
          res => {
            console.log('Upload' + res);
            this.rout.navigate(['/dashboard/tab3']);
          });
      }
  
    }
  
  
    async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'Loading image',
        duration: 2000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
  
      console.log('Loading dismissed!');
    }
    moveFocus(nextElement) {
      nextElement.setFocus();
    }  
    goToTerms(){
      this.navCtrl.navigateForward('/terms');
    }
    goToPrivacy(){
      this.navCtrl.navigateForward('/privacy');
    }
    goToEditProfile(){
      this.navCtrl.navigateForward('/edit-profile');
    }
    
    getImagesDatabase() {
      this.afDB.list('Images').snapshotChanges(['child_added']).subscribe(images => {
        images.forEach(image => {
          this.getImagesStorage(image);
        });
      });
    }
    
    getImagesStorage(image: any) {
      const imgRef = image.payload.exportVal().ref;
      this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
        console.log(imgUrl);
        this.images.push({
          name: image.payload.exportVal().name,
          url: imgUrl
        });
      });
    }

    async openDeleteAccountAlert() {
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
              console.log('Confirm Ok');
              this.authService.DeleteUser(
                this.authService.userData.email,
                data.password,
              ).then(() => {
                this.closeUserEditModal();
              });
              
            }
          }
        ]
      });
      await alert.present();
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

    
    async openPhotoEditModal() {
      const modal = await this.modalController.create({
        component: EditImagePage,
      });
      return await modal.present();
    }
    gotoImage(){
      this.router.navigate(['/edit-image']);
    }
    

}


  
  


