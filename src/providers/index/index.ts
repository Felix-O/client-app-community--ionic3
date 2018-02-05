import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the IndexProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IndexProvider {

  public url: string = 'https://fo-server--express.herokuapp.com/';

  constructor(public http: Http) {
  }

  getUsers(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Content-Type', 'text/plain');
      headers.append('Accept', 'application/json');
      headers.append('Accept', 'text/plain');
      headers.append('Content-Type', 'Authorization');
      this.http.get(this.url + 'api/index/users', {headers: headers})
          .subscribe(res => {
             let data = res.json();
              resolve(data);
          }, (err) => {
              reject(err);
          });
    });
  }

  getUser(details){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let body = {
        username: details
      };
      //console.log(JSON.stringify(body));
      /**/
      this.http.post(this.url + 'api/index/user', JSON.stringify(body), {headers: headers})
          .subscribe(res => {
             let data = res.json();
              resolve(data);
          }, (err) => {
              reject(err);
          });/**/
    });
  }

  getContents(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Content-Type', 'text/plain');
      headers.append('Accept', 'application/json');
      headers.append('Accept', 'text/plain');
      //headers.append("Cache-Control", "no-store");
      this.http.get(this.url + "api/googledrive/filecontents", {headers: headers})
          .subscribe(res => {
             let data = res.json();
              resolve(data);
          }, (err) => {
              reject(err);
          });
    });
  }/**/

}
