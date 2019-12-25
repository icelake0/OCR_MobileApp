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
  private editing = false;
  private oldText = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private helper : HelperProvider, private tts : TextToSpeech, private storage : Storage) {
    this.savedText = navParams.data.savedText
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTextPage');
  }
  
  playText(text){
    this.isPlaying = true;
    let ttsOptions = {
      text : text,
      locale : 'en-US',
      rate : 0.7
    }
    this.tts.speak(ttsOptions)
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

  startEdit(){
    this.editing = true;
    this.oldText = this.savedText.content
  }
  cancleEdit(){
    this.editing = false;
    this.savedText.content = this.oldText;
  }
  saveEdit(){
    this.storage.get('saved_text').then((savedTexts) => {
      if(!savedTexts){
        savedTexts = [];
      }
      savedTexts.forEach((element, key) => {
        if(element.id === this.savedText.id){
          savedTexts[key] = this.savedText;
          this.storage.set('saved_text', savedTexts).then((res)=>{
          })
        }
      });
      this.editing = false;
    });
  }

}
