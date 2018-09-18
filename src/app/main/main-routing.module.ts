import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonsComponent } from './selarom/persons/persons.component';
import { CarsComponent } from './selarom/cars/cars.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'selarom/persons', component: PersonsComponent, data: { permission: 'Pages.Persons' }  },
                    { path: 'selarom/cars', component: CarsComponent, data: { permission: 'Pages.Cars' }  },
                    { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
