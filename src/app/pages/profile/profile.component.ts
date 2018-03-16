import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
        .subscribe( resp => {
          console.log(resp);
        });
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
    let urlImageTemp = reader.readAsDataURL( archivo );

    // reader.onloadend = () => this.imagenTemp = reader.result;

    reader.onloadend = () => {
      console.log(reader.result);
      this.imagenTemp = reader.result;
    };
  }

  cambiarImage() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }
}
