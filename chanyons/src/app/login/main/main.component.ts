import { SwiperConfig } from 'ngx-swiper-wrapper';
import { DataServiceService } from './../../chanyon-api/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  configLogin = {
    noSwiping: true,
    noSwipingClass: 'noSwipe'
  };

  configPage = {
    direction: 'vertical',
    keyboard: {
      enabled: true,
      onlyInViewport: false
    }
  };

  bg = [
    'url("assets/img/chanyons/chanyon1.jpg")',
    'url("assets/img/chanyons/chanyon2.jpg")',
    'url("assets/img/chanyons/chanyon3.jpg")',
    'url("assets/img/chanyons/chanyon4.jpg")',
    'url("assets/img/chanyons/chanyon5.jpeg")',
    'url("assets/img/chanyons/chanyon6.jpg")',
    'url("assets/img/chanyons/chanyon7.jpg")',
    'url("assets/img/chanyons/chanyon8.jpg")',
    'url("assets/img/chanyons/chanyon9.jpg")',
    'url("assets/img/chanyons/chanyon10.jpg")',
    'url("assets/img/chanyons/chanyon11.jpg")',
    'url("assets/img/chanyons/chanyon1.jpg")',
    'url("assets/img/chanyons/chanyon1.jpg")',
    'url("assets/img/chanyons/chanyon1.jpg")',
  ];

  index = 0;
  loginIndex = 0;

  user: any = {};
  name: string;

  constructor(
    private dataService: DataServiceService,
    private route: Router) { }

  ngOnInit() {
    this.dataService.getCurrentUser()
    .subscribe(currentUser => {
      this.user = currentUser;
      this.userCheck();
    });
  }

  login() {
    this.dataService.login(this.name)
    .subscribe(newUser => {
      this.user = newUser;
      this.userCheck();
    });
  }

  userCheck() {
    if (this.user.userIdPub) {
      this.route.navigate(['/rooms']);
    }
  }
}
