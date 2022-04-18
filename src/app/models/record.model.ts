export class Record {
  id: number = -1;
  usedDeckId: number = 0;
  isWinningGame: number = 0;

  constructor(usedDeckId?: number, isWinningGame?: number) {
    this.usedDeckId = usedDeckId;
    this.isWinningGame = isWinningGame;
  }
}
