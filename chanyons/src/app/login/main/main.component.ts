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
    slidesPerView: 1,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    effect: 'fade'
  };

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
