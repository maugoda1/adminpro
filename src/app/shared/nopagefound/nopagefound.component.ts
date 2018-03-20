import { Component, OnInit } from '@angular/core';

declare function ini_plugins();


@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    ini_plugins();
  }

}
