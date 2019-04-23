import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { GmapComponent } from './room/gmap/gmap.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };
export const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    RoomComponent,
    GmapComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCT79L5vbYiosQ-FQCDIWmR_PPIMKFDqDw'
    }),
    SwiperModule
  ],
  exports: [
    RoomComponent,
    LoginComponent,
    PageNotFoundComponent,
    GmapComponent
  ],
  providers: [
    { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG}
  ]
})
export class ChanyonModule { }
