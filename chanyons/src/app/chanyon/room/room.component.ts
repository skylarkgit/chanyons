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
  room: string;
  user: any = {exists: false};

  constructor(
    private socket: Socket,
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.msgs = [];
    this.initUser();
  }

  sendMsg() {
    this.socket.emit(this.room, this.message);
    this.message = '';
  }

  createRoom() {
    this.httpClient.get('http://localhost:4000/create').subscribe((response: any) => {
      this.room = response.roomId;
      this.socket.emit('join', this.room);
      this.socket.on(this.room, (data) => {
        this.msgs.push(data);
      });
    });
  }

  login() {
    this.httpClient.get('http://localhost:4000/new-user').subscribe((response) => {
      this.initUser(response);
    });
  }

  initUser(user?: any) {
    this.user = {
      userId: this.cookieService.get('user_id') ? this.cookieService.get('user_id') : (user ? user.userId : null),
      userIdPub: this.cookieService.get('user_id_pub') ? this.cookieService.get('user_id_pub') : (user ? user.userIdPub : null)
    };
    console.log(this.user);
    if (this.user.userId) {
      this.cookieService.set('user_id', this.user.userId);
      this.cookieService.set('user_id_pub', this.user.userIdPub);
      this.user.exists = true;
    }
  }

}
