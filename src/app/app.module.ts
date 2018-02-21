import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PetsComponent} from './components/pets/pets.component';
import {PersonalComponent} from './components/personal/personal.component';
import {VisitorsComponent} from './components/visitors/visitors.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {VisitorService} from './service/visitor.service';
import {PetService} from './service/pet.service';


@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    PersonalComponent,
    VisitorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [VisitorService, PetService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
