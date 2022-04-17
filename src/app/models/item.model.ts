export class Item {
  id: number = -1;
  itemName: string = "";
  description: string = "";

  constructor(itemName?: string, description?: string) {
    this.itemName = itemName;
    this.description = description;
  }
}
