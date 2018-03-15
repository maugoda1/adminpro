import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardsGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate() {

    if ( this._usuarioService.estaLogueado() ) {
      console.log('PASO EL GUARD');
      return true;
    } else {
      console.log('BLOQUADO POR EL GUARD');
      this.router.navigate(['/login']);
      swal('No se puede acceder a esta pagina', 'Porque no de encuentra Logueado', 'warning');
      return false;
    }
  }
}
