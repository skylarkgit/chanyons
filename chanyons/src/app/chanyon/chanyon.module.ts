import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };

@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    RoomComponent
  ]
})
export class ChanyonModule { }
