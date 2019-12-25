import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewTextPage } from '../../pages/view-text/view-text'
import { Storage } from '@ionic/storage';
import { HelperProvider } from '../../providers/helper/helper'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private savedTexts = [];
  constructor(public navCtrl: NavController, private storage : Storage, private helper : HelperProvider,) {

  }

  openDetails(savedText) {
    this.navCtrl.push(ViewTextPage, {savedText})
  }

  ionViewWillEnter(){
    this.storage.get('saved_text').then((savedTexts) => {
      if(!savedTexts){
        savedTexts = [];
      }
      this.savedTexts = savedTexts;
      console.log('the save text', JSON.stringify(this.savedTexts));
    });
  }

}
