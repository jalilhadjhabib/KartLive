import { NavController, ToastController } from '@ionic/angular';
import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../shared/authentication-service";
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  splash = true;
  providerFb: firebase.auth.FacebookAuthProvider;

  constructor(public toastController: ToastController,
    public navCtrl: NavController,
    public authService: AuthenticationService,
    public router: Router,
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private fb: Facebook,
    public platform: Platform,
    public afStore: AngularFirestore,
    ) {
      this.providerFb = new firebase.auth.FacebookAuthProvider();
      }
          ngOnInit() {
            setTimeout(() => {
              this.splash = false}, 5000);
          }
          goToLogin2() {
            this.navCtrl.navigateForward('/login2');
          }
          goToTerms(){
            this.navCtrl.navigateForward('/terms');
          }
          goToPrivacy(){
            this.navCtrl.navigateForward('/privacy');
          }
          facebookLogin() {
            if (this.platform.is('cordova')) {
              console.log('PLateforme cordova');
              this.facebookCordova();
            } else {
              console.log('PLateforme Web');
              this.facebookWeb();
            }
        }
        
        facebookWeb() {
          this.afAuth
            .signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then((success) => {
              //this.authService.SendVerificationMail();
                   
              console.log('Info Facebook: ' + JSON.stringify(success));
              this.afStore.doc('users/' + success.user.uid).set({
                    displayName: success.user.displayName,
                    photoURL: success.user.photoURL,
                    uid: success.user.uid,
                    email: success.user.email,
                    emailVerified: success.user.emailVerified
                  });
            }).catch((error) => {
              console.log('Erreur: ' + JSON.stringify(error));
            });
        }
        
        facebookCordova() {
          this.fb.login(['email']).then( (response) => {
              const facebookCredential = firebase.auth.FacebookAuthProvider
                  .credential(response.authResponse.accessToken);
              firebase.auth().signInWithCredential(facebookCredential)
              .then((success) => {
                this.router.navigate(['dashboard']);          
                this.afStore.doc('users/' + success.user.uid).set({
                  displayName: success.user.displayName,
                  photoURL: success.user.photoURL,
                  uid: success.user.uid,
                  email: success.user.email,
                  emailVerified: success.user.emailVerified
                  });
              }).catch((error) => {
                  console.log('Erreur: ' + JSON.stringify(error));
              });
          }).catch((error) => { console.log(error); });
        }
          

  
}
