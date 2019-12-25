import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { CameraPage } from '../pages/camera/camera';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewTextPage } from '../pages/view-text/view-text'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { ImageToTextProvider } from '../providers/image-to-text/image-to-text';
import { HelperProvider } from '../providers/helper/helper';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    CameraPage,
    ContactPage,
    HomePage,
    TabsPage,
    ViewTextPage,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    CameraPage,
    ContactPage,
    HomePage,
    TabsPage,
    ViewTextPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    TextToSpeech,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImageToTextProvider,
    HelperProvider
  ]
})
export class AppModule {}
