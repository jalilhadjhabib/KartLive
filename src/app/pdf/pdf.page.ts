import { Component, OnInit } from '@angular/core';
import { environment } from './data';
import { InvoiceComponent } from '../components/invoice/invoice.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {
  
  public order = environment.orderData;

  constructor(private modalCtrl: ModalController) { }

  async openInvoice(order) {
    const InvoiceModal = await this.createModal(InvoiceComponent, { order });
    await InvoiceModal.present();
  }

  async createModal(component, componentProps?, cssClass?): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create({
      component,
      cssClass,
      componentProps,
      backdropDismiss: true
    });
    return modal;
  }


  ngOnInit() {
  }

}
