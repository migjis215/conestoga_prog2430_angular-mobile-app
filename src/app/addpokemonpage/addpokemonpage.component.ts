import { Component, OnInit } from '@angular/core';
import { Pokemon } from "../models/pokemon.model";
import { DatabaseService } from "../services/database.service";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-addpokemonpage',
  templateUrl: './addpokemonpage.component.html',
  styleUrls: ['./addpokemonpage.component.css']
})

export class AddpokemonpageComponent implements OnInit {
  pokemon: Pokemon = new Pokemon();
  types = AppComponent.types;

  constructor(private database: DatabaseService,
              private router: Router) { }

  ngOnInit(): void {
  }

  btnAddPokemon_click() {
    this.database.insertPokemon(this.pokemon, () => {
      console.log("Record added successfully");
      alert("Record added successfully");
      this.router.navigate(['pokemon'])
        .then(() => {
          window.location.reload();
        });
    })
  }
}
