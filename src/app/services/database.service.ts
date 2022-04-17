import {Injectable} from '@angular/core';
import {Pokemon} from "../models/pokemon.model";

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

      sql = "CREATE TABLE IF NOT EXISTS pokemon(" +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " pokemon_name VARCHAR(20) NOT NULL," +
        " type VARCHAR(10) NOT NULL, " +
        " hp INTEGER);";
      tx.executeSql(sql, options, () => {
        console.info("Success: create pokemon table successful");
      }, DatabaseService.errorHandler)

      // sql = "CREATE TABLE IF NOT EXISTS type("
      //   + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
      //   + "name VARCHAR(10) NOT NULL);";
      // tx.executeSql(sql, options, () => {
      //   console.info("Success: create type table successful");
      // }, DatabaseService.errorHandler);
      //
      // sql = "INSERT INTO type(name) VALUES(?);";
      // options = ['NORMAL'];
      // tx.executeSql(sql, options, () => {
      //   console.info("Success: row inserted successfully to type table");
      // }, DatabaseService.errorHandler);
      //
      // options = ['FIRE'];
      // tx.executeSql(sql, options, () => {
      //   console.info("Success: row inserted successfully to type table");
      // }, DatabaseService.errorHandler);
      //
      // options = ['WATER'];
      // tx.executeSql(sql, options, () => {
      //   console.info("Success: row inserted successfully to type table");
      // }, DatabaseService.errorHandler);
      //
      // options = ['GRASS'];
      // tx.executeSql(sql, options, () => {
      //   console.info("Success: row inserted successfully to type table");
      // }, DatabaseService.errorHandler);
      //
      // options = ['ELECTRIC'];
      // tx.executeSql(sql, options, () => {
      //   console.info("Success: row inserted successfully to type table");
      // }, DatabaseService.errorHandler);
      //
      // options = ['PSYCHIC'];
      // tx.executeSql(sql, options, () => {
      //   console.info("Success: row inserted successfully to type table");
      // }, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table creation transaction successful");
    });
  }

  private dropTables(): void {
    function txFunction(tx: any): any {
      var sql: string = "DROP TABLE IF EXISTS pokemon;";
      var options = [];

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

  // crud operations
  public insert(pokemon: Pokemon, callback) {
    function txFunction(tx: any) {
      var sql: string = 'INSERT INTO pokemon(pokemon_name, type, hp) VALUES(?, ?, ?);';
      var options = [pokemon.pokemonName, pokemon.type, pokemon.hp];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: insert transaction successful');
    });
  }

  // public select(id: number): Promise<any> {
  //   let options = [id];
  //   let book: Book = null;
  //
  //   return new Promise((resolve, reject) => {
  //     function txFunction(tx) {
  //       let sql = "SELECT * FROM books WHERE id=?;";
  //
  //       tx.executeSql(sql, options, (tx, results) => {
  //         if (results.rows.length > 0) {
  //           // for (let i = 0; i < results.rows.length; i++) {
  //           let row = results.rows[0];
  //           book = new Book(row['name'], row['price']);
  //           book.id = row['id'];
  //           // books.push(b);
  //           // }
  //           resolve(book);
  //         } else {
  //           reject("No book found")
  //         }
  //
  //       }, DatabaseService.errorHandler);
  //     }
  //
  //     this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
  //       console.log('Success: select transaction successful');
  //     });
  //   });
  // }
  //
  public selectAll(): Promise<any> {
    let options = [];
    let books: Pokemon[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM pokemon;";

        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let p = new Pokemon(row['pokemon_name'], row['type'], row['hp']);
              p.id = row['id'];
              books.push(p);
            }
            resolve(books);
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

  public delete(pokemon: Pokemon, callback) {
    function txFunction(tx: any) {
      var sql: string = 'DELETE FROM pokemon WHERE id=?;';
      var options = [pokemon.id];

      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log('Success: delete transaction successful');
    });
  }

  // public update(book: Book, callback) {
  //   function txFunction(tx: any) {
  //     var sql: string = 'UPDATE books SET name=?, price=? WHERE id=?;';
  //     var options = [book.name, book.price, book.id];
  //
  //     tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
  //   }
  //
  //   this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
  //     console.log('Success: update transaction successful');
  //   });
  // }
}
