import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {Deck} from "../models/deck.model";
import {Pokemon} from "../models/pokemon.model";
import {Item} from "../models/item.model";

@Component({
  selector: 'app-deckspage',
  templateUrl: './deckspage.component.html',
  styleUrls: ['./deckspage.component.css']
})
export class DeckspageComponent implements OnInit {
  decks: Deck[] = [];
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

    this.database.selectAllDecks()
      .then(data => {
        this.decks = data;
      })
      .catch(err => {
          console.error(err);
        }
      );
  }

  btnEditDeck_click(deck: Deck) {
    this.router.navigate(['edit-deck/' + deck.id]);
  }

  btnDeleteDeck_click(deck: Deck) {
    this.database.deleteDeck(deck, () => {
      alert("Record deleted successfully");
    });

    this.ngOnInit();
  }
}
