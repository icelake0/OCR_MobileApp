import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { CameraPage } from '../camera/camera';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageToTextProvider } from '../../providers/image-to-text/image-to-text';
import { HelperProvider } from '../../providers/helper/helper'
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = CameraPage;

  constructor(public navCtrl: NavController, 
    private camera: Camera, 
    private imageToTextProvider : ImageToTextProvider,
    private helper : HelperProvider,
    private storage : Storage,
    ) {}

  showCam(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.helper.showLoading();
      this.imageToTextProvider.getTextFromImage(base64Image)
      .subscribe(res=>{
        this.helper.loading.dismiss();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        this.helper.showAlert('New Note added.');
        if(res.text){
          let today = new Date()
          let today_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
          let today_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          let createdAt = `${today_date} ${today_time}`
          let new_text = {
            'createdAt' : createdAt,
            'id' : '_' + Math.random().toString(36).substr(2, 9) + today.getTime(),
            'content' : res.text
          }
          this.storage.get('saved_text').then((savedTexts) => {
            if(!savedTexts){
              savedTexts = [];
            }
            savedTexts.unshift(new_text);
            console.log('The storage saved_text', JSON.stringify(savedTexts));
            this.storage.set('saved_text', savedTexts).then((res)=>{
              console.log('we are now in storage')
            })
          });
        }
      },err=>{
        this.helper.loading.dismiss();
        console.error('Internet error',JSON.stringify(err))
        this.helper.showError({error:{message:'Pleae check your internet connection'}});
      })
  
     }, (err) => {
       if(err !== 'No Image Selected'){
          this.helper.showError({error:{message:'Something went wrong'}});
       }
     });

  }
}
