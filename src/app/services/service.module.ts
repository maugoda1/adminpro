import { ModalUploadService } from './../components/modal-upload/modal-upload.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardsGuard,
  SubirArchivoService,
  HospitalService
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
    SubirArchivoService,
    ModalUploadService,
    HospitalService
  ],
  declarations: []
})
export class ServiceModule { }
