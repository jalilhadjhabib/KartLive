import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  anuncios: any[] = [];
  info: any[] = [];
  private itemsCollection: AngularFirestoreCollection<any>;


  constructor(public afs: AngularFirestore, public rout: Router) {
  }


  goto(id) {
    this.rout.navigateByUrl(id);
  }

  // User stuff

  getProfile(id) {
    this.itemsCollection = this.afs.collection<any>(`users/${id}/pic/`);

    return this.itemsCollection.snapshotChanges().pipe(map((info: any[]) => {
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));
  }




  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(`users/${value.uid}/pic`).add({
        img: value.img,
        uid: value.uid,
        date: Date.now(),
      });
      this.rout.navigate(['/dashboard/tab3']);
    });
  }


  updateUser(value, id?) {
    return this.afs.collection('users').doc(value.uid).collection('pic').doc(id).set(value);
   }

   // Entry stuff

  AddEntry(description) {
    // uniq generetad id 
    const id = Math.random().toString(36).substring(2);
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(`entrys`).doc(id).set({
        description: description,
        id: id,
        date: Date.now()
      });
      this.rout.navigate(['/dashboard/tab3']);
    });
  }

  

  getEntrys() {
    this.itemsCollection = this.afs.collection<any>(`entrys`);

    return this.itemsCollection.snapshotChanges().pipe(map((info: any[]) => {
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));
  }





}
