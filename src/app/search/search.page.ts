import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { VideoService } from '../services/video.service';
import { Title } from '@angular/platform-browser';


const STORAGE_KEY = "theme";
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  theme;
  pet: any;
  lorem: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  searchresults = [];
  finalResult = '';
  distring:string;
  show:boolean = true;
  iontoggle:boolean;
  // finalResults: any;

  kanyesongs = [
    { id: 1, name: 'I Love It', song: '467M views • 10 months ago', length: '2:11' },
    { id: 2, name: 'Ni**as In Paris', song: '255M views • 7 years ago', length: '4:12' },
    { id: 3, name: 'Gold Digger [Clean]', song: '227M views • 10 years ago', length: '3:42' },
    { id: 4, name: 'FourFiveSeconds', song: '425M • 4 years ago', length: '3:12' },
  ];

  constructor(private title:Title,private route: ActivatedRoute, private router: Router, private http: HttpClient, private videoservice: VideoService) {
    this.pet = "friends";
    this.finalResult = this.route.snapshot.paramMap.get('slug');
    this.getSearchVideos();
    route.params.subscribe(val=>{
      this.theme = localStorage.getItem(STORAGE_KEY);

      if(localStorage.getItem(STORAGE_KEY)==="dark"){
        this.iontoggle = false;
      }else{
        this.iontoggle = true;
      }
    });
  }

  ngOnInit() {
    this.getSearchVideos();
    this.title.setTitle(this.finalResult+' - Youtube')
    this.distring = this.finalResult;
    this.theme = localStorage.getItem(STORAGE_KEY);
  }

  getSearchVideos() {
    this.videoservice.getVideos().pipe(delay(1500))
      .subscribe((data) => {
        this.searchresults = this.filteredVideos(data);
        this.show = false;
        if(this.searchresults.length === 0){
          this.show = false;
        }
      });
  }

  textChange(){
    this.router.navigate(['/search/'+this.finalResult]);
  }

  changeRoute(text){
    this.router.navigate(['/'+text]);
  }

  toggleTheme($event){
    this.theme = this.videoservice.changeTheme();
    this.iontoggle = !this.iontoggle;
  }


  filteredVideos(array) {
    return array.filter((item) => {
      const video = item.user + ' ' + item.name;
      return video.toLowerCase().includes(this.finalResult.toLowerCase());
    });
  }

  truncateString(str, num) {
    return str.length > num ? str.slice(0, num >= 3 ? num - 3 : num) + '...' : str;
  }
}
