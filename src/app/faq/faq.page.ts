import { Component } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html'
})
export class FaqPage {

  //Quick and easy way to hold the state of each FAQ item
  questionElements = [
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];

  constructor(
    public navCtrl: NavController
  ) { }

  expandElement(id) {
    //Expand or hide the card element
    if (this.questionElements[id] == true) {
      this.questionElements[id] = false
    } else {
      this.questionElements[id] = true
    }

  }
}