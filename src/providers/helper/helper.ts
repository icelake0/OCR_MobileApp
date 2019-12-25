import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  AlertController, LoadingController, Platform } from 'ionic-angular';
import moment from 'moment';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {
  public loading;
  constructor(public http: HttpClient, 
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    public platform: Platform
  ) {}

  showLoading(){
    this.loading = this.loadingCtrl.create({
      spinner:'ios',
      content: 'Please wait...'
    });
    this.loading.present();
  }
  showAlert(message){
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: `${message}`,
      buttons: ['Dismiss'],
    });
    alert.present();
  }
  showError(error){
    let alert = this.alertCtrl.create({
      title: 'Error',
      message: `${error.error.message}`,
      buttons: ['Dismiss'],
    });
    alert.present();
  }
  humanReadableTime(time){
    return moment(time).format("Do MMMM, YYYY. HH:mm A") 
  }

}
