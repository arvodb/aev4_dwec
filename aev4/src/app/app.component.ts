import { Component } from '@angular/core';
import { gameOne, gameTwo, gameThree } from './english';
import { AdjectivesGameOne, AdjectivesGameTwo, AdjectivesGameThree } from './interfaces/adjectives';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public gameStart: boolean = false;
  public rows: number = 0;
  public cols: number = 0;
  public gameNumber: number = 0; // <= Esta variable controla en que juego estamos.
  public gameLvl: number = 0; // <= esta variable controla en lvl dentro de cada juego. ver function setRowsCols

  public rowsColsSchema: string[] = ['2', '3', '4'];//Esta variable sirve para definir las el formato según el nivel en el que estamos

  /* VARIABLES QUE CONTIENEN LA INFO DE CADA JUEGO */
  public gameOneSchema: AdjectivesGameOne = gameOne;
  public gameTwoSchema: AdjectivesGameTwo = gameTwo;
  public gameThreeSchema: AdjectivesGameThree = gameThree;

  /* VARIABLE QUE CONTIOENE TODOS LOS JUEGOS */
  public allGames: [AdjectivesGameOne, AdjectivesGameTwo, AdjectivesGameThree] = [this.gameOneSchema, this.gameTwoSchema, this.gameThreeSchema];

  public currentGame: any = this.allGames[this.gameNumber];// <= Contiene la estructura del juego actual => Ver setCurrentAdjectiveSet

  public currentAdjectiveSet: string[] = [];// <= Contiene el set de adjetivos del NIVEL(gameLvl) en el que estamos => Ver setCurrentAdjectiveSet
  public currentTable: string[][] = [['', ''], ['', '']];// <= Contiene un array con los adjetivos de currentAdjetiveSet pero con la forma de la tabla; => Ver setCurrentTable
  //public activeAdjectives : FlatArray<string[], 0 | 3 | 1 | 2 | 4>[] = [];
  public activeAdjectives : string[][] =[[]];

  ngOnInit(){
    //responses necesarias para el
    this.gameOneActiveSets();
  }

  public gameOneActiveSets() : void
  {
    this.gameStart = true;
    this.setRowsCols();
    this.setCurrentAdjectiveSet(); // ejecutamos
    let maxLevels = (this.gameNumber != 2 ) ? 3 : 1;
    for ( let i  = 0 ;  i < maxLevels ; i++ ){
      this.activeAdjectives[i] = this.createValidArr(this.currentAdjectiveSet)
    }
    console.log(this.activeAdjectives);
  }

  public gameControl(): void {
    switch (this.gameNumber) {
      case (0):

        //
        let interval =  setInterval(() => {
          this.currentTable =
          this.transformInTable(this.sortAdjectiveSet(this.activeAdjectives[this.gameLvl]))
        }, 100)

        setTimeout(() => {
          clearInterval(interval);
        }, 3000)
        break;
      case (1):
        this.resetValues(); // <= resetea rows, cols y  gameLvl / suma 1 a gameNumber
        this.setRowsCols();
        this.setCurrentAdjectiveSet()
        this.currentTable = this.setCurrentTable(this.currentAdjectiveSet);

        break;
      case (2):
        this.resetValues()
        this.gameLvl = 2; // <= Es necesario para cuando pasa por la función => setCurrentAdjectiveSet
        this.setRowsCols();
        this.setCurrentAdjectiveSet()
        this.currentTable = this.setCurrentTable(this.currentAdjectiveSet);
    }

  }

  public startGameOne() : void
  {
    this.currentTable = this.setCurrentTable(this.currentAdjectiveSet)
    let interval =  setInterval(() => {
      this.currentTable = this.setCurrentTable(this.currentAdjectiveSet)
    }, 100)

    setTimeout(() => {
      clearInterval(interval);
    }, 3000)
  }

  public createValidArr(arr: string[]): string[] {
    let arrLength = this.rows * this.cols;
    let output = this.sortAdjectiveSet(arr, arrLength)
    return output;
  }
  public sortAdjectiveSet(arr: string[], length: number = arr.length): string[] {

    let output = [];
    for (let i = 0; i < length; i++) {
      let newAdj = arr[this.randomNumber()];
      if (this.numRepitions(output, newAdj) < 1) { //Si no lo encuentra
        output.push(newAdj);
      } else {
        i--;
      }
    }
    console.log(output);
    return output;
  }
  public numRepitions(arr: string[], newItem: string): number {
    return arr.filter((existing) => (existing === newItem)).length
  }
  public randomNumber(max: number = this.currentAdjectiveSet.length): number { // <= si no le pasas valor te coge la longitud máxima del set de adjetivos en uso

    return Math.floor(Math.random() * (max))
  }
  //dota el array de bidimensionalidad para generar la tabla
  public transformInTable(arr: string[]): string[][] {
    let output = new Array;
    for (let i = 0; i < this.rows; i++) {
      output.push(arr.splice(0, this.cols)); //corta del array y retrna.
    }

    return output;
  }

  //retorna el set de palabras en juego;
  public setCurrentTable(arr: string[]): string[][] {
    return this.currentTable = this.transformInTable(this.createValidArr(arr));//Genera un array => transformInTable => devuelve el array en dos dimensiones
  }

  public setCurrentAdjectiveSet(): void {
    let adjectiveSet = [];
    switch (this.gameLvl) {
      case 0:
        adjectiveSet = this.currentGame.levelOne.adjectivesOne;
        break;
      case 1:
        adjectiveSet = this.currentGame.levelTwo.adjectivesOne;
        break;
      case 2:
        if (this.gameNumber < 2) { // <= ver estructura gameTree.levelThree
          adjectiveSet = this.setAdjetiveForLvlThree(); //barajea entre los 3 sets de adjetivos.
        } else {
          adjectiveSet = this.currentGame.adjectivesOne; // <= la estructura del gameThree es diferente ! es necesario setear el gameLvl a 2;
        }
        break;
    }

    this.currentAdjectiveSet = adjectiveSet;
  }
  public setAdjetiveForLvlThree(): string[] {
    let arr = new Array;
    let random = this.randomNumber(3);
    switch (random) {
      case 0:
        arr = this.currentGame.levelThree.adjectivesOne;
        break;
      case 1:
        arr = this.currentGame.levelThree.adjectivesTwo;
        break;
      case 2:
        arr = this.currentGame.levelThree.adjectivesThree;
        break;
    }
    return arr;
  }

  //Setea las rows y cols en juego.
  public setRowsCols(): void {
    this.rows = parseInt(this.rowsColsSchema[this.gameLvl]);
    this.cols = parseInt(this.rowsColsSchema[this.gameLvl]);
  }

  public resetValues(): void {
    this.rows = 0;
    this.cols = 0;
    this.gameLvl = 0;
    this.gameNumber += 1;
  }




}
