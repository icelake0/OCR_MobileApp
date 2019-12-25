import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageToTextProvider } from '../../providers/image-to-text/image-to-text';
import { HelperProvider } from '../../providers/helper/helper'


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, 
              private camera: Camera, 
              private imageToTextProvider : ImageToTextProvider,
              private helper : HelperProvider
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

        // this.storage.set('auth', this.authProvider.auth).then((res)=>{
        //   //inform the app.component to load auth form storage
        //   this.events.publish('user:signin_signinout');
        // })
        // console.log(JSON.stringify(res))
  
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
