import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpHeaders } from '@angular/common/http';

/*
  Generated class for the ImageToTextProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageToTextProvider {

  private bearer: string = `token`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.bearer
    })
  };

  constructor(public http: HttpClient) {
    //console.log('Hello ImageToTextProvider Provider');
  }

  getTextFromImage(image): Observable<any>{
    let body={
      image:image,
    }
    return this.http.post(`http://gdfiles.sgd5communications.com/api/v2/getTextFromImage`,body,this.httpOptions);
  }

}
