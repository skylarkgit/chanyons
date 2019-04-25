import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  @Input() size: string;

  constructor() { }

  ngOnInit() {
    if (!this.size) {
      this.size = '1.5em';
    }
  }

}
