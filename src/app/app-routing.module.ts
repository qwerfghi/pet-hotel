import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EmployeesComponent} from './components/employees/employees.component';
import {PetsComponent} from './components/pets/pets.component';
import {VisitorsComponent} from './components/visitors/visitors.component';
import {AddressComponent} from './components/address/address.component';

const routes: Routes = [
  {path: '', redirectTo: '/employees', pathMatch: 'full'},
  {path: 'employees', component: EmployeesComponent},
  {path: 'pets', component: PetsComponent},
  {path: 'visitors', component: VisitorsComponent},
  {path: 'addresses', component: AddressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
