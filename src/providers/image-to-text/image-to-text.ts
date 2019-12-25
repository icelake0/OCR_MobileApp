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

  private bearer: string = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQwN2NiZDk4NzE3ZGYyYmMwOGQ4YmJjNmY3YjQ5YzVlY2E4MzU3MGRlZmFmYWYyMmZlYWU4NjI5NmExNzdkMjI5ZDg2NTdlYTAwZGZjN2M5In0.eyJhdWQiOiIyIiwianRpIjoiNDA3Y2JkOTg3MTdkZjJiYzA4ZDhiYmM2ZjdiNDljNWVjYTgzNTcwZGVmYWZhZjIyZmVhZTg2Mjk2YTE3N2QyMjlkODY1N2VhMDBkZmM3YzkiLCJpYXQiOjE1MzE5OTQ2MTQsIm5iZiI6MTUzMTk5NDYxNCwiZXhwIjoxNTYzNTMwNjE0LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.fLSre7Wxrjqrnig2g4raANqwBiC2j_QG7VJ3CBliOQjoIJEP3oflaU3wICPLsZMBiOUkjsGGRVfgwb_TmaV8JomTQgL7cAMS7_9PLPHzTf-Llwj2k0RYLEQaNsrBcBAs-WsmQQ2MGew297RNJnQt8nzi9kzXuDezIMh9F6nNW4bAOxC4ELwMiVMJO02yR1uJ4n-DFiFC8DdBxd4TyglBs_25kBcvGBvSEo5MhoLkKbQn5Sar8GMc-P4svjjcjdxBh4FtBMf-DDM8D4zPP3I4reWdkMmcVFtCrEZDxvndjTVYVCcxi4CQCaOq2w6wtxjTKrvA82Zz2mVTWxZKnV_pQtFMKct0Ng3jtMUXGMp_hhhNnySGwr4kOt-_F-fj3CnEO757HDoDbh1KrvgUMkWN8oeIs4ZYtu9MGwZOunGZ53lCqOgWSmtXzXjyNs1NtXt1nhqalFBrnjuJSLMf-jNEk1-sX5TzKzmnK8iabdJPKeD8C8Ie9AgHdoOv7H_p3Hejsh_mCXUWw2R5ZCIEFlxinmlT3fyLrDVwOA3gPvVUJXSAb7H6veyiG_z9mzWGp1Lk0EpEG9Cvbzfn5KWvQz-8j2wt5pyEHaG7kzCDdn3YAuWnUTXCaQcOmKra6oS1q7u36893GcP4ug2oYWcDh8ZbdFkewCJoHFo5aJoXRkNLWVs`;
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
