import { Component, OnInit } from '@angular/core';
import {Item} from "../models/item.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-additemspage',
  templateUrl: './additemspage.component.html',
  styleUrls: ['./additemspage.component.css']
})
export class AdditemspageComponent implements OnInit {
  item: Item = new Item();

  constructor(private database: DatabaseService,
              private router: Router) { }

  ngOnInit(): void {
  }

  btnAddItem_click() {
    this.database.insertItem(this.item, () => {
      console.log("Record added successfully");
      alert("Record added successfully");
      this.router.navigate(['items'])
        .then(() => {
          window.location.reload();
        });
    })
  }
}
