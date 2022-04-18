import { Component, OnInit } from '@angular/core';
import {Record} from "../models/record.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {Pokemon} from "../models/pokemon.model";
import {Deck} from "../models/deck.model";

@Component({
  selector: 'app-recordspage',
  templateUrl: './recordspage.component.html',
  styleUrls: ['./recordspage.component.css']
})
export class RecordspageComponent implements OnInit {
  records: Record[] = [];
  decks: Deck[] = []

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

    this.database.selectAllRecords()
      .then(data => {
        this.records = data;
      })
      .catch(err => {
        console.error(err);
      }
    );
  }

  btnEditRecord_click(record: Record) {
    this.router.navigate(['edit-record/' + record.id]);
  }

  btnDeleteRecord_click(record: Record) {
    this.database.deleteRecord(record, () => {
      alert("Record deleted successfully");
    });

    this.ngOnInit();
  }
}
