import { Component, OnInit } from '@angular/core';
import {Pokemon} from "../models/pokemon.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../services/database.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-editpokemonpage',
  templateUrl: './editpokemonpage.component.html',
  styleUrls: ['./editpokemonpage.component.css']
})
export class EditpokemonpageComponent implements OnInit {
  pokemon: Pokemon = new Pokemon();
  types = AppComponent.types;

  constructor(private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router) { }

  ngOnInit(): void {
    let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.database.selectPokemon(id)
      .then(data => {
        this.pokemon = data;
      })
      .catch(err => {
        console.error(err);
      }
    );
  }

  btnUpdatePokemon_click() {
    this.database.updatePokemon(this.pokemon, () => {
      alert("Pokemon updated successfully");
      this.router.navigate(['pokemon'])
        .then(() => {
          window.location.reload();
        });
    });
  }
}
