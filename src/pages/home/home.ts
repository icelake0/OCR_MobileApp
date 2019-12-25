import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewTextPage } from '../../pages/view-text/view-text'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private savedTexts = [];
  constructor(public navCtrl: NavController, private storage : Storage) {

  }

  openDetails() {
   
    this.navCtrl.push(ViewTextPage)
  }

  ionViewWillEnter(){
    this.storage.get('saved_text').then((savedTexts) => {
      if(!savedTexts){
        savedTexts = [];
      }
      this.savedTexts = savedTexts;
    });
  }

}
