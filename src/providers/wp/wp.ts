import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WpProvider {

  url:string = "http://livingwaternazarene.com/";

  constructor(
    public http: Http) {
  }

  loadSermons(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.url + 'wp-json/wp/v2/ctc_sermon', {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
              resolve(data);
          }, (err) => {
              reject(err);
          });
    });
  }

  loadEvents(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.url + 'wp-json/wp/v2/ctc_events', {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
              resolve(data);
          }, (err) => {
              reject(err);
          });
    });
  }

  loadUsers(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.url + 'wp-json/wp/v2/users', {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
              resolve(data);
          }, (err) => {
              reject(err);
          });
    });
  }

  loadUser(userQuery){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(this.url + 'wp-json/wp/v2/users' + userQuery , {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
              resolve(data);
          }, (err) => {
              reject(err);
          });
    });
  }

}
