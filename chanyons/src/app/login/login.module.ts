import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChanyonModule } from './../chanyon/chanyon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';

export const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ChanyonModule,
    SwiperModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG}
  ]
})
export class LoginModule { }
