import { Component, OnInit } from '@angular/core';
import {Item} from "../models/item.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-edititemspage',
  templateUrl: './edititemspage.component.html',
  styleUrls: ['./edititemspage.component.css']
})
export class EdititemspageComponent implements OnInit {
  item: Item = new Item();

  constructor(private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router) { }

  ngOnInit(): void {
    let id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.database.selectItem(id)
      .then(data => {
        this.item = data;
      })
      .catch(err => {
        console.error(err);
      });
  }

  btnUpdateItem_click() {
    this.database.updateItem(this.item, () => {
      alert("Pokemon updated successfully");
      this.router.navigate(['items'])
        .then(() => {
          window.location.reload();
        });
    });
  }
}
