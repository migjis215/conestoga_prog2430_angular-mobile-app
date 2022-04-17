import {Injectable} from '@angular/core';
import {Pokemon} from "../models/pokemon.model";
import {Item} from "../models/item.model";
import {Deck} from "../models/deck.model";

declare function openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess): any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any = null;

  constructor() { }

  private static errorHandler(error): any {
    console.error("Error: " + error);
  }

  private createDatabase(): void {
    let shortName = "PokemonDeckDB";
    let version = "1.0"
    let displayName = "DB for Angular MyPokemon App";
    let dbSize = 2 * 1024 * 1024;

    this.db = openDatabase(shortName, version, displayName, dbSize, () => {
      console.log("Success: Database created successfully");
    })
  }

  private createTables(): void {
    function txFunction(tx: any): any {
      var sql: string = "";
      var options = [];

      sql = `CREATE TABLE IF NOT EXISTS pokemon(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        pokemon_name VARCHAR(20) NOT NULL,
        type VARCHAR(10) NOT NULL,
        hp INTEGER NOT NULL);`;
      tx.executeSql(sql, options, () => {
        console.info("Success: create pokemon table successful");
      }, DatabaseService.errorHandler);

      sql = `CREATE TABLE IF NOT EXISTS items(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        item_name VARCHAR(20) NOT NULL,
        description VARCHAR(200) NOT NULL);`;
      tx.executeSql(sql, options, () => {
        console.info("Success: create items table successful");
      }, DatabaseService.errorHandler);

      sql = `CREATE TABLE IF NOT EXISTS decks(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        deck_name VARCHAR(50) NOT NULL,
        first_pokemon_id INTEGER NOT NULL,
        second_pokemon_id INTEGER NOT NULL,
        third_pokemon_id INTEGER NOT NULL,
        item_id INTEGER NOT NULL,
        FOREIGN KEY (first_pokemon_id) REFERENCES pokemon(id),
        FOREIGN KEY (first_pokemon_id) REFERENCES pokemon(id),
        FOREIGN KEY (first_pokemon_id) REFERENCES pokemon(id),
        FOREIGN KEY (item_id) REFERENCES items(id));`;
      tx.executeSql(sql, options, () => {
        console.info("Success: create decks table successful");
      }, DatabaseService.errorHandler)
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table creation transaction successful");
    });
  }

  private dropTables(): void {
    function txFunction(tx: any): any {
      var sql: string = "";
      var options = [];

      sql = "DROP TABLE IF EXISTS decks;";

      tx.executeSql(sql, options, () => {
        console.info("Success: DROP table successful");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS items;";

      tx.executeSql(sql, options, () => {
        console.info("Success: DROP table successful");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS pokemon;";

      tx.executeSql(sql, options, () => {
        console.info("Success: DROP table successful");
      }, DatabaseService.errorHandler)
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table drop transaction successful");
    });
  }

  public clearDB(): void {
    let result = confirm("Really want to clear database?");
    if (result) {
      this.dropTables();
      this.db = null;
      alert("Database cleared");
    }
  }

  public initDB(): void {
    if (this.db == null) {
      try {
        // create database
        this.createDatabase();
        // create tables
        this.createTables();
      } catch (e) {
        console.error("Error in initDB(): " + e);
      }
    }
  }

  getDatabase(): any {
    this.initDB();
    return this.db;
  }

  // crud operations for pokemon
  public insertPokemon(pokemon: Pokemon, callback) {
    function txFunction(tx: any) {
      var sql: string = 'INSERT INTO pokemon(pokemon_name, type, hp) VALUES(?, ?, ?);';
      var options = [pokemon.pokemonName, pokemon.type, pokemon.hp];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: insert transaction successful');
    });
  }

  public selectPokemon(id: number): Promise<any> {
    let options = [id];
    let pokemon: Pokemon = null;

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM pokemon WHERE id=?;";

        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            pokemon = new Pokemon(row['pokemon_name'], row['type'], row['hp']);
            pokemon.id = row['id'];
            resolve(pokemon);
          } else {
            reject("No pokemon found")
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log('Success: select transaction successful');
      });
    });
  }

  public selectAllPokemon(): Promise<any> {
    let options = [];
    let pokemons: Pokemon[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM pokemon;";

        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let p = new Pokemon(row['pokemon_name'], row['type'], row['hp']);
              p.id = row['id'];
              pokemons.push(p);
            }
            resolve(pokemons);
          } else {
            reject("No pokemons found")
          }

        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log('Success: selectAll transaction successful');
      });
    });
  }

  public deletePokemon(pokemon: Pokemon, callback) {
    function txFunction(tx: any) {
      var sql: string = 'DELETE FROM pokemon WHERE id=?;';
      var options = [pokemon.id];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: delete transaction successful');
    });
  }

  public updatePokemon(pokemon: Pokemon, callback) {
    function txFunction(tx: any) {
      var sql: string = 'UPDATE pokemon SET pokemon_name=?, type=?, hp=? WHERE id=?;';
      var options = [pokemon.pokemonName, pokemon.type, pokemon.hp, pokemon.id];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: update transaction successful');
    });
  }

  // crud operations for items
  public insertItem(item: Item, callback) {
    function txFunction(tx: any) {
      var sql: string = 'INSERT INTO items(item_name, description) VALUES(?, ?);';
      var options = [item.itemName, item.description];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: insert transaction successful');
    });
  }

  public selectItem(id: number): Promise<any> {
    let options = [id];
    let item: Item = null;

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM items WHERE id=?;";

        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            item = new Item(row['item_name'], row['description']);
            item.id = row['id'];
            resolve(item);
          } else {
            reject("No items found")
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log('Success: select transaction successful');
      });
    });
  }

  public selectAllItems(): Promise<any> {
    let options = [];
    let items: Item[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM items;";

        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let item = new Item(row['item_name'], row['description']);
              item.id = row['id'];
              items.push(item);
            }
            resolve(items);
          } else {
            reject("No items found")
          }

        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log('Success: selectAll transaction successful');
      });
    });
  }

  public deleteItem(item: Item, callback) {
    function txFunction(tx: any) {
      var sql: string = 'DELETE FROM items WHERE id=?;';
      var options = [item.id];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: delete transaction successful');
    });
  }

  public updateItem(item: Item, callback) {
    function txFunction(tx: any) {
      var sql: string = 'UPDATE items SET item_name=?, description=? WHERE id=?;';
      var options = [item.itemName, item.description, item.id];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: update transaction successful');
    });
  }

  // crud operations for deck
  public insertDeck(deck: Deck, callback) {
    function txFunction(tx: any) {
      var sql: string = 'INSERT INTO decks(deck_name, first_pokemon_id, second_pokemon_id, third_pokemon_id, item_id) VALUES(?, ?, ?, ?, ?);';
      var options = [deck.deckName, deck.firstPokemonId, deck.secondPokemonId, deck.thirdPokemonId, deck.itemId];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: insert transaction successful');
    });
  }

  public selectDeck(id: number): Promise<any> {
    let options = [id];
    let deck: Deck = null;

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM decks WHERE id=?;";

        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            deck = new Deck(row['deck_name'], row['first_pokemon_id'], row['second_pokemon_id'], row['third_pokemon_id'], row['item_id']);
            deck.id = row['id'];
            resolve(deck);
          } else {
            reject("No items found")
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log('Success: select transaction successful');
      });
    });
  }

  public selectAllDecks(): Promise<any> {
    let options = [];
    let decks: Deck[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM decks;";

        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let deck = new Deck(row['deck_name'], row['first_pokemon_id'], row['second_pokemon_id'], row['third_pokemon_id'], row['item_id']);
              deck.id = row['id'];
              decks.push(deck);
            }
            resolve(decks);
          } else {
            reject("No items found")
          }

        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log('Success: selectAll transaction successful');
      });
    });
  }

  public deleteDeck(deck: Deck, callback) {
    function txFunction(tx: any) {
      var sql: string = 'DELETE FROM decks WHERE id=?;';
      var options = [deck.id];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: delete transaction successful');
    });
  }

  public updateDeck(deck: Deck, callback) {
    function txFunction(tx: any) {
      var sql: string = 'UPDATE decks SET deck_name=?, first_pokemon_id=?, second_pokemon_id=?, third_pokemon_id=?, item_id=? WHERE id=?;';
      var options = [deck.deckName, deck.firstPokemonId, deck.secondPokemonId, deck.thirdPokemonId, deck.itemId, deck.id];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: update transaction successful');
    });
  }
}
