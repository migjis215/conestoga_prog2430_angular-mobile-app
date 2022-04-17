import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {Pokemon} from "../models/pokemon.model";

@Component({
  selector: 'app-pokemonpage',
  templateUrl: './pokemonpage.component.html',
  styleUrls: ['./pokemonpage.component.css']
})
export class PokemonpageComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private database: DatabaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.database.selectAllPokemon()
      .then(data => {
        this.pokemons = data;
      })
      .catch(err => {
        console.error(err);
      }
    );
  }

  btnEditPokemon_click(pokemon: Pokemon) {
    this.router.navigate(['edit-pokemon/' + pokemon.id]);
  }

  btnDeletePokemon_click(pokemon: Pokemon) {
    this.database.deletePokemon(pokemon, () => {
      alert("Record deleted successfully");
    });

    this.ngOnInit();
  }
}
