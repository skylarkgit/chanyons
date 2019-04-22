import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { GmapComponent } from './room/gmap/gmap.component';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };

@NgModule({
  declarations: [
    RoomComponent,
    GmapComponent
  ],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCT79L5vbYiosQ-FQCDIWmR_PPIMKFDqDw'
    })
  ],
  exports: [
    RoomComponent
  ]
})
export class ChanyonModule { }
