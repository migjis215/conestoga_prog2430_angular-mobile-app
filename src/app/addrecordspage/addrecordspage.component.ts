import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {Record} from "../models/record.model";
import { Deck } from '../models/deck.model';

@Component({
  selector: 'app-addrecordspage',
  templateUrl: './addrecordspage.component.html',
  styleUrls: ['./addrecordspage.component.css']
})
export class AddrecordspageComponent implements OnInit {
  record: Record = new Record();
  decks: Deck[] = [];

  constructor(private database: DatabaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.database.selectAllDecks()
      .then(data => {
        this.decks = data;
      })
      .catch(err => {
        console.error(err);
      }
    );
  }

  btnAddRecord_click() {
    this.database.insertRecord(this.record, () => {
      console.log("Record added successfully");
      alert("Record added successfully");
      this.router.navigate(['records'])
        .then(() => {
          window.location.reload();
        });
    })
  }
}
