import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewTextPage } from '../../pages/view-text/view-text'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openDetails() {
   
    this.navCtrl.push(ViewTextPage)
  }

}
