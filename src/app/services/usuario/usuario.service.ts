import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map'; // operador Map. cuando el servidor devuelve valor correcto
import 'rxjs/add/operator/catch'; // operador chatch. cuando el servidor devuelve error
import { Observable } from 'rxjs/Observable'; // para el catch retorne un observable.

import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('toke');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
        .map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
        });

  }

  login( usuario: Usuario, recordar: boolean ) {
    console.log('recuerdame', recordar);
    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
        .map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
        })
        .catch ( (err: any) => {
          // console.log('status Error:', err);
          swal('Error en el Login', err.error.mensaje, 'error');
          return Observable.throw( err );
        });

  }


  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
        .map( (resp: any) => {
          swal('Usuario creado', usuario.email, 'success');
          return resp.Usuario;
        });



  }

  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
          .map( (resp: any) => {
            // this.usuario = resp.usuario;
            // console.log( resp);
            if ( usuario._id === this.usuario._id) {
              this.guardarStorage(resp.usuarios._id, this.token, resp.usuarios);
            }

            swal('Usuario Actualizado', this.usuario.nombre , 'success');
            return true;
          });

  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.surbirArchivo( archivo, 'usuarios', id)
          .then( (resp: any) => {
            console.log(resp.usuarioActualizado.img);
            this.usuario.img = resp.usuarioActualizado.img;
            this.guardarStorage(id, this.token, this.usuario);
            swal('Imagen Actualizada', this.usuario.nombre , 'success');
          })
          .catch ( resp => {
            console.log( resp );
          });
  }

  cargarUsuarios( desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );

  }

  buscarUsuarios( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
          .map ( (resp: any) => resp.usuarios);
  }

  borrarUsuario( id: string ) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
          .map(resp => {
            swal('Usuario Eliminado', 'El usuario ha sido eliminado correctamente', 'success');
            return true;
          });
  }
}
