import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingService, SidebarService, SharedService } from './service.index';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SettingService,
    SidebarService,
    SharedService
  ],
  declarations: []
})
export class ServiceModule { }
