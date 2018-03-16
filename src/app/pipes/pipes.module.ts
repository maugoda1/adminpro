import { NgModule } from '@angular/core';
import { ImagenPipe } from '../pipes/imagen.pipe';

@NgModule({
  imports: [  ],
  declarations: [
    ImagenPipe
  ],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
