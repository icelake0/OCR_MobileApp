import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ViewTextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-text',
  templateUrl: 'view-text.html',
})
export class ViewTextPage {

  private savedText;
  private isPlaying = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private helper : HelperProvider, private tts : TextToSpeech, private storage : Storage) {
    this.savedText = navParams.data.savedText
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTextPage');
  }
  
  playText(text){
    this.isPlaying = true;
    this.tts.speak(text)
    .then(() => {
      this.isPlaying = false;
    })
    .catch((reason: any) => console.log(reason));
  }

  stopTextPlay(){
    this.isPlaying = false;
    this.tts.speak('');
  }

  deletedSavedText(txtId){
    this.storage.get('saved_text').then((savedTexts) => {
      if(!savedTexts){
        savedTexts = [];
      }
      savedTexts.forEach((element, key) => {
        if(element.id === txtId){
          savedTexts.splice(key, 1);
          this.storage.set('saved_text', savedTexts).then((res)=>{
          })
        }
      });
      this.navCtrl.pop();
    });
  }

}
