import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  imageTable: string;
  titleTable: string;
  descriptionTable: string;
  priceTable: string;

  constructor(public firestore: AngularFirestore) { 
    this.items = this.firestore.collection('tables').valueChanges();
  }
  items: Observable<any[]>;
  addFirestore() {
    this.firestore.collection('tables').add({
      imageTable: this.imageTable,
      titleTable: this.titleTable,
      descriptionTable: this.descriptionTable,
      priceTable: this.priceTable,
      });
  }	
  ngOnInit() {
  }

}
