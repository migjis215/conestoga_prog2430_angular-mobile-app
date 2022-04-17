import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  // { path: 'add', component: AddpageComponent },
  // { path: 'show', component: ShowpageComponent },
  // { path: 'settings', component: SettingspageComponent },
  // { path: 'modify/:id', component: ModifypageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
