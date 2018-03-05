import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  public token: any;
  public user: any;
  public url: string = 'https://fo-server--express.herokuapp.com/';

  constructor(public http: Http, public storage: Storage) {
  }

  storedUser(){
    return this.storage.get('user');
  }

  storedToken(){
    return this.storage.get('token');
  }

  checkAuthentication(){
    return new Promise((resolve, reject) => {
        //Load token if exists
        this.storage.get('token').then((value) => {
            this.token = value;
            let headers = new Headers();
            headers.append('Authorization', this.token);
            this.http.get(this.url + 'api/auth/protected', {headers: headers})
            .subscribe(res => {
                console.log(res.json());
                resolve(res);
            }, (err) => {
                reject(err);
            });
        });
    });
  }

  createAccount(details){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url + 'api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            this.token = data.token;
            this.user = data.user;
            this.storage.set('token', data.token);
            this.storage.set('user', data.user);
            resolve(data);
          }, (err) => {
            reject(err);
          });
    });
  }
/**
  login(credentials){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url + 'api/auth/test', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            console.log(data);
            resolve(data);
            //resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }
/**/
  login(credentials){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url + 'api/auth/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            this.token = data.token;
            this.user = data.user;
            console.log(data);
            console.log(data.token);
            this.storage.set('user', data.user);
            this.storage.set('token', data.token);
            resolve(data);
            //resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }
/**/
  googleLogin(credentials){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url + 'api/auth/googlelogin', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            //console.log(data.user);
            //this.token = data.token;
            //this.user = data.user;
            //console.log(this.user);
            this.storage.set('user', data.user);
            this.storage.set('token', data.token);
            resolve(data);
            //resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  logout(){
    this.storage.set('token', '');
    this.storage.set('user', '');
  }

  updateAccount(details){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('Authorization', this.token);
        this.http.put(this.url + 'api/auth/update', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            //console.log(data);
            this.token = data.token;
            this.user = data.user;
            this.storage.set('token', data.token);
            this.storage.set('user', data.user);
            resolve(data);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteAccount(userID){
    console.log(userID);
    let userForDeletion = {
      _id : userID
    }
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.url + 'api/auth/delete', JSON.stringify(userForDeletion), {headers: headers})
          .subscribe(res => {
            //let data = res.json();
            this.logout();
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
