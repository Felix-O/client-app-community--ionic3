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
        //Load token if exists
        //this.storage.get('token').then((value) => {

            //this.token = value;

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.get(this.url + 'api/index/users', {headers: headers})
                .subscribe(res => {
                   let data = res.json();
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        //});
    });
  }

}
