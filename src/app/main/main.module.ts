import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { PersonsComponent } from './selarom/persons/persons.component';
import { ViewPersonModalComponent } from './selarom/persons/view-person-modal.component';
import { CreateOrEditPersonModalComponent } from './selarom/persons/create-or-edit-person-modal.component';

import { CarsComponent } from './selarom/cars/cars.component';
import { ViewCarModalComponent } from './selarom/cars/view-car-modal.component';
import { CreateOrEditCarModalComponent } from './selarom/cars/create-or-edit-car-modal.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';import { FileUploadModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { UtilsModule } from '@shared/utils/utils.module';
import { CountoModule } from 'angular2-counto';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { ModalModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    imports: [
		FileUploadModule,
		AutoCompleteModule,
		PaginatorModule,
		EditorModule,
		InputMaskModule,		TableModule,

        CommonModule,
        FormsModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        AppCommonModule,
        UtilsModule,
        MainRoutingModule,
        CountoModule,
        EasyPieChartModule
    ],
    declarations: [
		PersonsComponent,
		ViewPersonModalComponent,		CreateOrEditPersonModalComponent,
		CarsComponent,
		ViewCarModalComponent,		CreateOrEditCarModalComponent,
        DashboardComponent
    ]
})
export class MainModule { }
