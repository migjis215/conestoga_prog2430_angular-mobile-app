import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {DeckspageComponent} from "./deckspage/deckspage.component";
import {PokemonpageComponent} from "./pokemonpage/pokemonpage.component";
import {AddpokemonpageComponent} from "./addpokemonpage/addpokemonpage.component";
import {EditpokemonpageComponent} from "./editpokemonpage/editpokemonpage.component";
import {AdditemspageComponent} from "./additemspage/additemspage.component";
import {EdititemspageComponent} from "./edititemspage/edititemspage.component";
import {ItempageComponent} from "./itempage/itempage.component";
import {AdddeckspageComponent} from "./adddeckspage/adddeckspage.component";
import {EditdeckspageComponent} from "./editdeckspage/editdeckspage.component";
import {RecordspageComponent} from "./recordspage/recordspage.component";
import {AddrecordspageComponent} from "./addrecordspage/addrecordspage.component";
import {EditrecordspageComponent} from "./editrecordspage/editrecordspage.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'decks', component: DeckspageComponent },
  { path: 'pokemon', component: PokemonpageComponent },
  { path: 'add-pokemon', component: AddpokemonpageComponent },
  { path: 'edit-pokemon/:id', component: EditpokemonpageComponent },
  { path: 'items', component: ItempageComponent },
  { path: 'add-item', component: AdditemspageComponent },
  { path: 'edit-item/:id', component: EdititemspageComponent },
  { path: 'decks', component: DeckspageComponent },
  { path: 'add-deck', component: AdddeckspageComponent },
  { path: 'edit-deck/:id', component: EditdeckspageComponent },
  { path: 'records', component: RecordspageComponent },
  { path: 'add-record', component: AddrecordspageComponent },
  { path: 'edit-record/:id', component: EditrecordspageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
