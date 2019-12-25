import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageToTextProvider } from '../../providers/image-to-text/image-to-text';
import { HelperProvider } from '../../providers/helper/helper'
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home'


@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  constructor(public navCtrl: NavController, 
              private camera: Camera, 
              private imageToTextProvider : ImageToTextProvider,
              private helper : HelperProvider,
              private storage : Storage,
              ) {}
  ionViewWillEnter(){
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
        this.helper.showAlert('debug : we hot the test');
        console.log(JSON.stringify(res));
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
              this.navCtrl.push(HomePage);
            })
          });
        }
      },err=>{
        this.helper.loading.dismiss();
        console.log(JSON.stringify(err))
        this.helper.showError({error:{message:'debug : something bad happened'}});
      })
  
     }, (err) => {
       if(err === 'No Image Selected'){
          // say error :  no image captured -> got to home tab
          this.helper.showError({error:{message:'No image captured'}});
       }else{
          // say error :  Something went wrong -> got to home tab
          this.helper.showError({error:{message:'Something went wrong'}});
       }
     });

    
  }

}