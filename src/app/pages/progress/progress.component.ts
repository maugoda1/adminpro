import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: number = 20;
  progreso2: number = 30;

  constructor() {  }

  ngOnInit() {
  }

  cambiarValor1(inc: number) {

    if (this.progreso1 > 100 && inc > 0) {
      this.progreso1 = 100;
      return;
    }

    if (this.progreso1 < 0 && inc < 0 ) {
      this.progreso1 = 0;
      return;
    }
    this.progreso1 = this.progreso1 + inc;
  }

  cambiarValor2(inc: number) {

    if (this.progreso2 > 100 && inc > 0) {
      this.progreso2 = 100;
      return;
    }

    if (this.progreso2 < 0 && inc < 0 ) {
      this.progreso2 = 0;
      return;
    }
    this.progreso2 = this.progreso2 + inc;
  }

  actualizar1(even: number) {
    this.progreso1 = even;
  }
  actualizar2(even: number) {
    this.progreso2 = even;
  }
}
