import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PersonalComponent} from './components/personal/personal.component';
import {PetsComponent} from './components/pets/pets.component';
import {VisitorsComponent} from './components/visitors/visitors.component';

const routes: Routes = [
  {path: '', redirectTo: '/personal', pathMatch: 'full'},
  {path: 'personal', component: PersonalComponent},
  {path: 'pets', component: PetsComponent},
  {path: 'visitors', component: VisitorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
