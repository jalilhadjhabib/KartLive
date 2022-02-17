import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../../pages/cal-modal/cal-modal.page';
import { CalendarComponent } from 'ionic2-calendar';
import { EventsService } from '../../services/events/events.service';
import { map } from 'rxjs/operators';



@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

	eventSource:any = [];
	viewTitle: string;
	calendar = {
	  mode: 'month', // Change current month/week/day
	  currentDate: new Date(),
	  startHour: 0,
	  endHour: 26, // TODO: in documentation the limit is 24 but here not working
	};
  
	selectedDate: Date;
  
	@ViewChild( CalendarComponent ) myCal: CalendarComponent;
  
	constructor(
	  @Inject( LOCALE_ID ) private locale: string,
	  private alertCtrl: AlertController,
	  private modalCtrl: ModalController,
	  private eventsService: EventsService
	) { }
  
	ngOnInit(): void {
	  this.retrieveEvents();
	}
	// Get events to firebase
	retrieveEvents(): void {
	  this.eventsService.getAll().snapshotChanges().pipe( // Use Angular date pipe for conversion
		map( changes =>
		  changes.map(c =>
			({ key: c.payload.key, ...c.payload.val() })
		  )
		)
	  ).subscribe( data => {
		// Cast from IsoString to Date type
		data.forEach( event => {
		  event.startTime = new Date( event.startTime );
		  event.endTime = new Date( event.endTime );
		});
		this.eventSource = data;
	  });
	}
  
	next(): void {
	  this.myCal.slideNext();
	}
  
	back(): void {
	  this.myCal.slidePrev();
	}
  
	// Selected date reange and hence title changed
	onViewTitleChanged( title: any ): void {
	  this.viewTitle = title;
	}
  
	// Calendar event was clicked
	async onEventSelected( event ) {
	  let start: any, end: any;
	  if(event.allDay){
		// Use Angular date pipe for conversion
		start = formatDate( this.addDayToDate(event.startTime), 'medium', this.locale );
		end = formatDate( this.addDayToDate(event.endTime), 'medium', this.locale );
	  }else{
		// Use Angular date pipe for conversion
		start = formatDate( event.startTime, 'medium', this.locale );
		end = formatDate( event.endTime, 'medium', this.locale );
	  }
	  const alert = await this.alertCtrl.create({
		cssClass: 'event-alert',
		header: event.title,
		subHeader: event.price,
		message: 'From: ' + start + '<br><br>To: ' + end,
		buttons: ['OK']
	  });
	  alert.present();
	}
  
	async openCalModal() {
	  const modal = await this.modalCtrl.create({
		component: CalModalPage,
		cssClass: 'cal-modal',
		backdropDismiss: false,
		componentProps: { 
		  selectedDate: this.selectedDate
		}
	  });
  
	  await modal.present();
  
	  modal.onDidDismiss().then(( result ) => {
		if ( result.data && result.data.event ) {
		  // Parse times to Date type
		  let eventAux = {
			allDay: result.data.event.allDay,
			desc: result.data.event.desc,
			endTime: new Date( result.data.event.endTime ),
			title: result.data.event.title,
			startTime:  new Date( result.data.event.startTime )
		  };
  
		  // Save in firebase
		  if ( result.data.event.allDay ) {
			const startTimeToDate = new Date( result.data.event.startTime );
			result.data.event.startTime = this.setStartTimeToAllDay(startTimeToDate).toISOString();
			result.data.event.endTime = this.setEndTimeToAllDay(startTimeToDate).toISOString();
			/* result.data.event.startTime = new Date(Date.UTC(2021, 1, 2)).toISOString(); // 2 de febrero
			result.data.event.endTime = new Date(Date.UTC(2021, 1, 3)).toISOString(); // 2 de febrero */
		  }else{
			result.data.event.endTime = new Date( result.data.event.endTime ).toISOString();
		  }
		  result.data.event.startTime = new Date( result.data.event.startTime ).toISOString();
		  this.eventsService.addEvent( result.data.event );
		  
		  if ( eventAux.allDay ) {
			let start = eventAux.startTime;
			eventAux.startTime = this.setStartTimeToAllDay( start );
			eventAux.endTime = this.setEndTimeToAllDay( start );
			/* eventAux.startTime = new Date(Date.UTC(2021, 1, 2)); // 2 de febrero
			eventAux.endTime = new Date(Date.UTC(2021, 1, 3)); // 2 de febrero */
		  }
  
		  // Show
		  this.eventSource.push( eventAux );
		  this.myCal.loadEvents();
		}
	  });
	}
	onCurrentDateChanged( ev: Date ): void{
	  this.selectedDate = ev;
	}
  
	addDayToDate( start: Date): Date{
	  return new Date(
		Date.UTC(
		  start.getUTCFullYear(),
		  start.getUTCMonth(),
		  start.getUTCDate() + 1
		  )
	  );
	}
	setStartTimeToAllDay( start: Date): Date{
	  return new Date(
		Date.UTC(
		  start.getUTCFullYear(),
		  start.getUTCMonth(),
		  start.getUTCDate()
		  )
	  );
	}
	setEndTimeToAllDay( start: Date): Date{
	  return new Date(
		Date.UTC(
		  start.getUTCFullYear(),
		  start.getUTCMonth(),
		  start.getUTCDate() + 1,
		  0
		  )
	  );
	}
  
  }
  