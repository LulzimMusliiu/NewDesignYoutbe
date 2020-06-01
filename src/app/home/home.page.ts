import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute  } from '@angular/router';
import { VideoService } from '../services/video.service';
import { ModalController } from '@ionic/angular';
import { VideoPage } from '../video/video.page';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';

const STORAGE_KEY = "theme";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  content = [];
  theme:any;
  text: string;
  filterInput = '';
  pet:any;
  openToast: any;
  iontoggle:boolean;

  livevideos = [
    ['Muselk', '🔴 The Suppressed Assault Rifle is BACK in Fortnite!'],
    ['Tfue', 'watch this ⚡'],
    ['Maddynf', 'New setup woohoo! | Fortnite live stream'],
    ['Shpk Nazi', 'Shpk Nazi - Episodi 13 (Premiere)'],
    ['Flux', 'Logo Design Tips: Concept Vs Execution'],
    ['CHIWORLD1234', 'Cartoon Head Art (Adobe Illustrator)'],
  ];

  constructor(
    private title: Title,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public toastController: ToastController,
    private router: Router,
    private _videoservice: VideoService,
    public modalController: ModalController,
    private storage: Storage,
    private events: Events,
    private aroute: ActivatedRoute) {

    this.pet = "friends";
    let video = this.livevideos[Math.floor(Math.random() * this.livevideos.length)];
    this.presentToast(video[0],video[1]);


    //
    // this._videoservice.changeTheme().then((val)=>{
    //   console.log('AA '+val);
    // })
    // .subscribe((newValue:boolean) => {
    //     // This code will execute when the property has changed and also
    //     // you'll have access to the object with the information that
    //     // your service sent in the next() call.
    //     console.log('Qikjo vlera e re a '+newValue);
    //     this.theme = newValue;
    // });
    aroute.params.subscribe(val=>{
      this.theme = localStorage.getItem(STORAGE_KEY);
      this.filterInput = '';
      this.title.setTitle('Youtube');

      if(localStorage.getItem(STORAGE_KEY)==="dark"){
        this.iontoggle = false;
      }else{
        this.iontoggle = true;
      }
    });
    this.theme = localStorage.getItem(STORAGE_KEY);
  }

  ngOnInit(){
    this.fetchContent();
    this.title.setTitle('Youtube');
    this.theme = localStorage.getItem(STORAGE_KEY);
  }

  toggleTheme(event){
    this.theme = this._videoservice.changeTheme();
    this.iontoggle = !this.iontoggle;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: VideoPage
    });
    return await modal.present();
  }




  async presentToast(user:string, title:string) {
    this.openToast = await this.toastController.create({
      header: user +' is LIVE',
      message: title,
      duration: 4000,
      mode: "ios",
      color: 'tertiary',
      position: "bottom",
      cssClass: "live-notification",
      buttons: [
        {
          side: 'end',
          icon: 'ios-play-circle',
          handler: () => {
            this.router.navigateByUrl('/video');
          }
        }
      ]
    });
    this.openToast.present();
  }


  async verifiedToast($event) {
    try{
      this.openToast.dismiss();
    }catch(e){}
    this.openToast = await this.toastController.create({
      message: 'This is a verified account',
      duration: 2000,
      mode: "ios",
      color: 'primary',
      position: "bottom",
      cssClass: "live-notification",
    });
    this.openToast.present();
  }

  fetchContent(){
    this._videoservice.getVideos().pipe(delay(1500))
      .subscribe((data) =>{
        this.content = data;
        this.shuffleArray(this.content);
      });
  }

  // filteredVideos(){
  //   if (this.filterInput) {
  //     return this.content.filter((item) => {
  //       const videos = item.user+' '+ item.name;
  //       return videos.toLowerCase().includes(this.filterInput.toLowerCase());
  //     })
  //   } else {
  //     return this.content;
  //   }
  // }

  textChange(){
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //      theme: this.theme,
    //    }
    // };
    this.router.navigate(['/search/'+this.filterInput]);
  }

  deleteItem(i){
    this.content = this.content.slice(0, i).concat(this.content.slice(i + 1, this.content.length));
    this.checkContent();
  }

  shuffleArray(array){
    array.sort(()=> { return 0.5 - Math.random() });
  }

  checkContent(){
    if(this.content.length===0){
      this.text="No more content";
    }
  }

  truncateString(str, num) {
    return str.length > num ? str.slice(0, num >= 3 ? num - 3 : num) + '...' : str;
  }
  //
  // sanitize(html) {
  //   return this.sanitizer.bypassSecurityTrustHtml(html);
  // }

}
