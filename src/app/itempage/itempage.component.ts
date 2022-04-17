import { Component, OnInit } from '@angular/core';
import {Item} from "../models/item.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-itempage',
  templateUrl: './itempage.component.html',
  styleUrls: ['./itempage.component.css']
})
export class ItempageComponent implements OnInit {
  items: Item[] = [];

  constructor(private database: DatabaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.database.selectAllItems()
      .then(data => {
        this.items = data;
      })
      .catch(err => {
        console.error(err);
      }
    );
  }

  btnEditItem_click(item: Item) {
    this.router.navigate(['edit-item/' + item.id]);
  }

  btnDeleteItem_click(item: Item) {
    this.database.deleteItem(item, () => {
      alert("Record deleted successfully");
    });

    this.ngOnInit();
  }
}
