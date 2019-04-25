import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperConfig } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  config = {
    noSwiping: true,
    noSwipingClass: 'noSwipe'
  };

  constructor() { }

  ngOnInit() {
  }

}
