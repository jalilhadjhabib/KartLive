import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  commentaire: string;
  note:string;

  constructor(public firestore: AngularFirestore,public router: Router,  
    ) {
    this.items = this.firestore.collection('commentaire').valueChanges();
  }
  items: Observable<any[]>;
  addCommentaire() {
    this.firestore.collection('commentaire').add({
        text: this.commentaire,
        note:this.note
      });
  }	
  gototest(){
    this.router.navigate(['test']);
  }
}
