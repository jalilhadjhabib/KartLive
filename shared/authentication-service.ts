import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { ToastController } from '@ionic/angular';
import { NotificationService } from './notification.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { CamposFireBase } from './campos';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: User;
  email: string;
  private itemsCollection: AngularFirestoreCollection<any>;
  info: any[] = [];
  data: Observable<CamposFireBase[]>

  
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    public toastController:ToastController,
    public notiService: NotificationService,
    private fireStorage: AngularFireStorage,
    private db: AngularFireDatabase

  ) {
    this.data = afStore.collection('reservation').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CamposFireBase;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

    this.ngFireAuth.authState.subscribe(user => {
      if (user && user.emailVerified == true) {
        console.log("Connecté");
        this.router.navigate(['dashboard']);
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } 
      else if(user && user.emailVerified == false){
        this.router.navigate(['verify-email']);
      }
      else {
        this.router.navigate(['login']);
        console.log("Pas Connecté");
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }
  admin="admin@admin.com"
  pwdAdmin="admin"
  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          this.SendVerificationMail();
        } else {
          this.SetUserData(result.user).then(() => {
            this.ngZone.run(() => {
              this.router.navigate(['dashboard']);
            });
          }).catch((error) => {
            this.notiService.presentToast("error", 4000, 'danger');
          });
        }
      }).catch((error) => {
        if (email==this.admin && password==this.pwdAdmin){
          console.log("login admin")
        }
        else {
          console.log("y'a")
        }
      });
  }
  facebookWeb() {
    this.ngFireAuth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((success) => {
        //this.authService.SendVerificationMail();
             
        if (!success.user.emailVerified) {
          this.SendVerificationMail();
        } else {
          this.SetUserData(success.user).then(() => {
            this.ngZone.run(() => {
              this.router.navigate(['dashboard']);
            });
          }).catch((error) => {
            this.notiService.presentToast("error", 4000, 'danger');
          });
        }



      }).catch((error) => {
        console.log('Erreur: ' + JSON.stringify(error));
      });
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  // Email verification when new user register
  async SendVerificationMail() {
    return (await this.ngFireAuth.currentUser).sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Recover password
  /*PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }*/

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
}



  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      window.location.assign('/');
      localStorage.removeItem('user');
    })
  }
  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }

  DeleteUser(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.delete().then(() => {
          this.notiService.presentToast('Votre compte a été supprimé.', 4000, 'danger');
          this.router.navigate(['sign-in']);
        }).catch((error) => {
          this.notiService.presentToast(error.message, 4000, 'danger');
        });
      }).catch((error) => {
        this.notiService.presentToast(error.message, 4000, 'danger');
      });
  }

  UpdateProfile(newEmail, newDisplayName, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(this.userData.email, password)
      .then(async (result) => {
        if (this.userData.displayName != newDisplayName) {
          this.UpdateDisplayName(newDisplayName, result);
        }        
        if (this.userData.email != newEmail) {
          this.UpdateEmail(newEmail, password, result);
        }
      }).catch((error) => {
        this.notiService.presentToast(error.message, 4000, 'danger');
      });
  }
  async UpdateDisplayName(newDisplayName, userCredential) {
    await userCredential.user.updateProfile({
      displayName: newDisplayName
    }).catch((error) => {
      this.notiService.presentToast(error.message, 4000, 'danger');
    });
  }

  //Update Email
  async UpdateEmail(newEmail, password, userCredential) {
    await userCredential.user.updateEmail(newEmail)
    .catch((error) => {
      this.notiService.presentToast(error.message, 4000, 'danger');
    });
    this.SignIn(newEmail, password);
  }


   PostFireBase(data: CamposFireBase) {
    return this.afStore.collection('reservation').add(data)
  }

  GetFireBaseID(id: string) {
    return this.afStore.doc('reservation/' + id).valueChanges();
  }

  DeleteFireBase(id: string) {
    return this.afStore.doc('reservation/' + id).delete();
  }

  PutFireBase(data: CamposFireBase, id: string) {
    return this.afStore.doc('reservation/' + id).update(data)
  }
  GetFireBase() {
    return this.data;
  }

  getProfile2(id) {
    this.itemsCollection = this.afStore.collection<any>(`users/${id}/profile/`);

    return this.itemsCollection.snapshotChanges().pipe(map((info: any[]) => {
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));
  }

 


  createUser2(value) {
    return new Promise<any>((resolve, reject) => {
      this.afStore.collection(`users/${value.uid}/profile`).add({
        name: value.name,
        phone: value.phone,
        mail: value.mail,
        img: value.img,
        uid: value.uid,
        adress: value.adress,
        date: Date.now(),
        username: value.username,
      });
      this.router.navigateByUrl(`home`);
    });
  }


  updateUser2(value, id?) {
    return this.afStore.collection('users').doc(value.uid).collection('profile').doc(id).set(value);
   }










}