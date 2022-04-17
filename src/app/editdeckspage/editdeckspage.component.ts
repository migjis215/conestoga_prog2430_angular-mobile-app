import { Component, OnInit } from '@angular/core';
import {Deck} from "../models/deck.model";
import {Pokemon} from "../models/pokemon.model";
import {Item} from "../models/item.model";
import {DatabaseService} from "../services/database.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-editdeckspage',
  templateUrl: './editdeckspage.component.html',
  styleUrls: ['./editdeckspage.component.css']
})
export class EditdeckspageComponent implements OnInit {
  deck: Deck = new Deck();
  pokemons: Pokemon[] = [];
  items: Item[] = [];

  constructor(private database: DatabaseService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.database.selectDeck(id)
      .then(data => {
        this.deck = data;
      })
      .catch(err => {
        console.error(err);
      }
    );

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

  btnUpdateDeck_click() {
    this.database.updateDeck(this.deck, () => {
      alert("Deck updated successfully");
      this.router.navigate(['decks'])
        .then(() => {
          window.location.reload();
        });
      }
    );
  }
}
