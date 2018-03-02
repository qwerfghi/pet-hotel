import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PetsComponent} from './components/pets/pets.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {VisitorsComponent} from './components/visitors/visitors.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VisitorService} from './service/visitor.service';
import {PetService} from './service/pet.service';
import {EmployeeService} from './service/employee.service';
import {AddressComponent} from './components/address/address.component';
import {AddressService} from './service/address.service';


@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    EmployeesComponent,
    VisitorsComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [VisitorService, PetService, EmployeeService, AddressService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
