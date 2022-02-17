import { AuthenticationService } from "../../../shared/authentication-service";
import { CamposFireBase } from '../../../shared/campos';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {CalModalPage} from '../pages/cal-modal/cal-modal.page';
import MyEvent from '../models/myEvent';
import { EventsService } from '../services/events/events.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-reserve-info',
  templateUrl: './reserve-info.page.html',
  styleUrls: ['./reserve-info.page.scss'],
  providers: [CalModalPage]
})

export class ReserveInfoPage implements OnInit {

  @Input() id: string;
  @Input() type: string;



  event: MyEvent = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: false,
  };

  vipt=1000;
  reserv=1000;
  prix3=1000;
  data: CamposFireBase = {
    name: '',
    email: '',
    number: '',
    type:'',
    startTime:'',
    endTime:'',
  }
  editing: boolean = false
  private todo : FormGroup;
  
  constructor(
    public modalCtrl: ModalController,
    private fireBaseService: AuthenticationService,
    public toastController: ToastController,
    public firestore: AngularFirestore,
    private eventsService: EventsService,
    public router: Router,  
    private formBuilder: FormBuilder
  ) {
    this.items = this.firestore.collection('Items').valueChanges();  
    
     }
  items: Observable<any[]>;



  ngOnInit() {

    this.todo = this.formBuilder.group({
      name: ['gg', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      type: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],


    });



    if (this.type == 'edit') {
      this.LoadData()
    }
  }
addValue(e): void {
    var isChecked = e.currentTarget.checked
    if(isChecked=e.currentTarget.checked){
      this.prix3=this.reserv

    }
    else{
    }

  }
  LoadData() {
    this.fireBaseService.GetFireBaseID(this.id).subscribe(
      res => {
        this.data = res
        this.editing = true
      }, err => {
        console.log(err)
      })
  }

  async saveData() {
    await this.fireBaseService.PostFireBase(this.data);
    this.data = {}
    this.ToastSuccess()
    this.editing = true;
    this.closeModal()
  }

  async updateData() {
    await this.fireBaseService.PutFireBase(this.data, this.id);
    this.editing = false
    this.closeModal()
  }

  closeModal() {
    this.id = null
    this.data = {}

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async ToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Votre demande de réservation a bien été enregistrée',
      duration: 5000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

}
