import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../services/database.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Record} from "../models/record.model";
import {Deck} from "../models/deck.model";

@Component({
  selector: 'app-editrecordspage',
  templateUrl: './editrecordspage.component.html',
  styleUrls: ['./editrecordspage.component.css']
})
export class EditrecordspageComponent implements OnInit {
  record: Record = new Record();
  decks: Deck[] = [];

  constructor(private database: DatabaseService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.database.selectRecord(id)
      .then(data => {
        this.record = data;
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

  btnUpdateRecord_click() {
    this.database.updateRecord(this.record, () => {
        alert("Record updated successfully");
        this.router.navigate(['records'])
          .then(() => {
            window.location.reload();
          });
      }
    );
  }
}
