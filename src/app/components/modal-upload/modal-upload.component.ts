import { SubirArchivoService } from './../../services/subirArchivo/subir-archivo.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Title } from '@angular/platform-browser';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  oculto: string = '';

  imagenSubir: File;
  imagenTemp: string;

  constructor(
      public _subirArchivoService: SubirArchivoService,
      public _modalUploadService: ModalUploadService
    ) {
    // console.log('Modal Listo!');
  }

  ngOnInit() {
  }

  subirImagen() {
    console.log('subirImagenv');
    this._subirArchivoService.surbirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then( resp => {
          // console.log(resp);
          this._modalUploadService.notificacion.emit( resp );
          this.cerrarModal();
          this._modalUploadService.ocultarModal();
        })
        .catch( err => {
          console.log('Error en la carga de la imagen.');
        });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      this.imagenSubir = null;
      swal('Sólo imagenes', 'El archivo seleccionado no es una imagen.', 'error');
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();

    reader.onload =  (event: any) => {
      this.imagenTemp = reader.result;
    };

    reader.readAsDataURL( archivo );

  }

}
