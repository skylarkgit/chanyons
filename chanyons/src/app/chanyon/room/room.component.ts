import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [CookieService]
})
export class RoomComponent implements OnInit {

  msgs: any[];
  message;
  title: string;
  room: any;
  user: any = {exists: false};
  roomIdToJoin: string;

  constructor(
    private socket: Socket,
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.msgs = [];
    this.initUser();
  }

  sendMsg() {
    // this.socket.emit(this.room, this.message);
    this.httpClient.post<any>('http://localhost:4000/send-msg', {
      roomId: this.room.roomId,
      msg: this.message
    }).subscribe((res) => {
      if (!res) {
        alert('failed');
      }
    });
    this.message = '';
  }

  createRoom() {
    this.httpClient.get('http://localhost:4000/create?title=' + this.title).subscribe((response: any) => {
      this.room = response.room;
      this.socket.emit('join', this.room.roomId);
      this.socket.on(this.room.roomId, (data) => {
        this.msgs.push(data);
      });
    });
  }

  login() {
    this.httpClient.get('http://localhost:4000/new-user').subscribe((response) => {
      this.initUser(response);
    });
  }


  joinRoom() {
    this.httpClient.get<any>('http://localhost:4000/room?roomId=' + this.roomIdToJoin).subscribe((response) => {
      this.msgs = [];
      this.socket.on(response.roomId, (data) => {
        this.room = response;
        this.msgs.push(data);
      });
      this.room = response;
    });
  }

  initUser(user?: any) {
    this.httpClient.get<any>('http://localhost:4000/user').subscribe((response) => {
      this.user = response;
      if (this.user.userIdPub) {
        this.user.exists = true;
      }
    });
  }

}
