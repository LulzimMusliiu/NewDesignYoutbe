import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../interfaces/video';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public theme: any;
  private storageObserver: any;

  private _url: string = "/assets/data.json";
  constructor(private storage: Storage, private http: HttpClient, private events: Events) {


    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light');
    } else {
      this.theme = localStorage.getItem('theme');
    }
    //
    // this.storageObserver = null;
    //
    // this.theme = Observable.create(observer => {
    //   this.storageObserver = observer;
    //   console.log('qitu a po bohet najsen' + observer);
    // });
  }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this._url);
  }

  // changeTheme(){
  //   console.log('Old '+ this.theme);
  //   this.theme = !this.theme;
  //   console.log('NEW '+ this.theme);
  //   this.storage.set('theme',!this.theme);
  //   this.storageObserver.next(this.theme);
  //   return this.theme;
  // }

  changeTheme(){
    let currentSetting = localStorage.getItem('theme');

    switch (currentSetting) {
      case 'light':
        currentSetting = 'dark';
        break;
      case 'dark':
        currentSetting = 'light';
        break;
    }

    localStorage.setItem('theme', currentSetting);

    return currentSetting;
  }

  getValue() {
    return this.storage.get('theme');
  }




}
