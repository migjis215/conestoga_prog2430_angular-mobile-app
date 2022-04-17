export class Deck {
  id: number = -1;
  deckName: string = "";
  firstPokemonId: number = -1;
  secondPokemonId: number = -1;
  thirdPokemonId: number = -1;
  itemId: number = -1;

  constructor(deckName?: string,
              firstPokemonId?: number,
              secondPokemonId?: number,
              thirdPokemonId?: number,
              itemId?: number) {
    this.deckName = deckName;
    this.firstPokemonId = firstPokemonId;
    this.secondPokemonId = secondPokemonId;
    this.thirdPokemonId = thirdPokemonId;
    this.itemId = itemId;
  }
}
