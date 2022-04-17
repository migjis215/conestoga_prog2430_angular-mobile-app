import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {DeckspageComponent} from "./deckspage/deckspage.component";
import {PokemonpageComponent} from "./pokemonpage/pokemonpage.component";
import {AddpokemonpageComponent} from "./addpokemonpage/addpokemonpage.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'decks', component: DeckspageComponent },
  { path: 'pokemon', component: PokemonpageComponent },
  { path: 'add-pokemon', component: AddpokemonpageComponent },
  // { path: 'modify/:id', component: ModifypageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
