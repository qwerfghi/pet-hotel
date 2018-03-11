import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PetsComponent} from './components/pets/pets.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {OwnersComponent} from './components/owners/owners.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwnerService} from './service/owner.service';
import {PetService} from './service/pet.service';
import {EmployeeService} from './service/employee.service';
import {AddressComponent} from './components/address/address.component';
import {AddressService} from './service/address.service';
import {UpdateEmployeeComponent} from './components/employees/update-employee/update-employee.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UpdateAddressComponent} from './components/address/update-address/update-address.component';
import {UpdateOwnersComponent} from './components/owners/update-owners/update-owners.component';
import {UpdatePetsComponent} from './components/pets/update-pets/update-pets.component';


@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    EmployeesComponent,
    OwnersComponent,
    AddressComponent,
    UpdateEmployeeComponent,
    UpdateAddressComponent,
    UpdateOwnersComponent,
    UpdatePetsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [OwnerService, PetService, EmployeeService, AddressService],
  entryComponents: [UpdateEmployeeComponent, UpdateAddressComponent, UpdateOwnersComponent, UpdatePetsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
