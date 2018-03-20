import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from './../../models/hospital.model';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

import 'rxjs/add/operator/map';

@Injectable()
export class HospitalService {

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { }

  cargarHospitales( desde: number = 0) {
    let url = URL_SERVICIOS + '/hospitales?desde=' + desde;

    return this.http.get( url );

  }


}
