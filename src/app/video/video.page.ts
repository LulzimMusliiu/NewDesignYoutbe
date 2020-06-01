import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  pepperoni: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  value($event){
    console.log(this.pepperoni);
  }

}
