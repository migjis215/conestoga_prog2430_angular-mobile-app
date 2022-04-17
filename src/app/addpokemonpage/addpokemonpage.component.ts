import { Component, OnInit } from '@angular/core';
import { Pokemon } from "../models/pokemon.model";
import { DatabaseService } from "../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-addpokemonpage',
  templateUrl: './addpokemonpage.component.html',
  styleUrls: ['./addpokemonpage.component.css']
})

export class AddpokemonpageComponent implements OnInit {
  pokemon: Pokemon = new Pokemon();
  types: string[] = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic'];

  constructor(private database: DatabaseService,
              private router: Router) { }

  ngOnInit(): void {
  }

  btnAdd_click() {
    this.database.insert(this.pokemon, () => {
      console.log("Record added successfully");
      alert("Record added successfully");
      this.router.navigate(['pokemon'])
        .then(() => {
          window.location.reload();
        });
    })
  }
}
