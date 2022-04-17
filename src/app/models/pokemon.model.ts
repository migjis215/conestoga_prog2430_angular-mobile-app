export class Pokemon {
  id: number = -1;
  pokemonName: string = "";
  type: string = "";
  hp: number = 0;

  constructor(pokemonName?: string, type?: string, hp?: number) {
    this.pokemonName = pokemonName;
    this.type = type;
    this.hp = hp;
  }
}
