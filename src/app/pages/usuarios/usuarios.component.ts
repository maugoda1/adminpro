import { UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any; // para que funcione la definición tipo pregunta

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios() );
  }

  mostarModal( id: string ) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;  // Activa el icono de espera
    this._usuarioService.cargarUsuarios( this.desde )
          .subscribe( (resp: any) => {

            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;
            this.cargando = false;  // para el manejo de visualizador de espera
          });
  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
      return;
    }
    if ( desde <= 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    // console.log ( termino );
    if ( termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios( termino)
          .subscribe( (usuarios: Usuario[]) => {
            // console.log ( usuarios );
            this.usuarios = usuarios;
            this.cargando = false;
          });
  }

  borarUsuario(usuario: Usuario) {

    if ( usuario._id ===  this._usuarioService.usuario._id ) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      console.log (borrar);
      if (borrar) {

        this._usuarioService.borrarUsuario( usuario._id )
              .subscribe( res => {
                console.log(res);
                this.cargarUsuarios();
              });
      }
    });

  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario ( usuario)
        .subscribe();
  }

}
