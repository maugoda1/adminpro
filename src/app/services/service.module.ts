import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardsGuard,
  SubirArchivoService
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardsGuard,
    SubirArchivoService
  ],
  declarations: []
})
export class ServiceModule { }
