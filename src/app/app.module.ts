import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { NavComponent } from './nav/nav.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { DeckspageComponent } from './deckspage/deckspage.component';
import { PokemonpageComponent } from './pokemonpage/pokemonpage.component';
import { AddpokemonpageComponent } from './addpokemonpage/addpokemonpage.component';
import { AdditemspageComponent } from './additemspage/additemspage.component';
import { ItempageComponent } from './itempage/itempage.component';
import { EditpokemonpageComponent } from './editpokemonpage/editpokemonpage.component';
import { EdititemspageComponent } from './edititemspage/edititemspage.component';
import { AdddeckspageComponent } from './adddeckspage/adddeckspage.component';
import { EditdeckspageComponent } from './editdeckspage/editdeckspage.component';
import { RecordspageComponent } from './recordspage/recordspage.component';
import { AddrecordspageComponent } from './addrecordspage/addrecordspage.component';
import { EditrecordspageComponent } from './editrecordspage/editrecordspage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    FooterComponent,
    DeckspageComponent,
    PokemonpageComponent,
    AddpokemonpageComponent,
    AdditemspageComponent,
    ItempageComponent,
    EditpokemonpageComponent,
    EdititemspageComponent,
    AdddeckspageComponent,
    EditdeckspageComponent,
    RecordspageComponent,
    AddrecordspageComponent,
    EditrecordspageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
