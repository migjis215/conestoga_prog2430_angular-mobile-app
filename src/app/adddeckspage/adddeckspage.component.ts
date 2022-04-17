import { Component, OnInit } from '@angular/core';
import {Pokemon} from "../models/pokemon.model";
import {DatabaseService} from "../services/database.service";
import {Item} from "../models/item.model";
import {Deck} from "../models/deck.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adddeckspage',
  templateUrl: './adddeckspage.component.html',
  styleUrls: ['./adddeckspage.component.css']
})
export class AdddeckspageComponent implements OnInit {
  deck: Deck = new Deck();
  pokemons: Pokemon[] = [];
  items: Item[] = [];

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

    this.database.selectAllItems()
      .then(data => {
        this.items = data;
      })
      .catch(err => {
        console.error(err);
      }
    );
  }

  btnAddDeck_click() {
    this.database.insertDeck(this.deck, () => {
      console.log("Record added successfully");
      alert("Record added successfully");
      this.router.navigate(['decks'])
        .then(() => {
          window.location.reload();
        });
    })
  }
}
