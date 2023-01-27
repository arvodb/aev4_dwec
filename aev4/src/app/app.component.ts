import { Component, Input } from '@angular/core';
import { gameOne, gameTwo, gameThree } from './english';
import { AdjectivesGameOne, AdjectivesGameTwo, AdjectivesGameThree } from './interfaces/adjectives';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public service: DataService,) { }

  public gameStart: boolean = false;
  public rows: number = 0;
  public cols: number = 0;
  public gameNumber: number = 0; // <= Esta variable controla en que juego estamos.
  public gameLvl: number = 0; // <= esta variable controla en lvl dentro de cada juego. ver function setRowsCols
  //
  public rowsColsSchema: string[] = ['2', '3', '4'];//Esta variable sirve para definir las el formato según el nivel en el que estamos

  /* VARIABLES QUE CONTIENEN LA INFO DE CADA JUEGO */
  public gameOneSchema: AdjectivesGameOne = gameOne;
  public gameTwoSchema: AdjectivesGameTwo = gameTwo;
  public gameThreeSchema: AdjectivesGameThree = gameThree;

  /* VARIABLE QUE CONTIOENE TODOS LOS JUEGOS */
  public allGames: [AdjectivesGameOne, AdjectivesGameTwo, AdjectivesGameThree] = [this.gameOneSchema, this.gameTwoSchema, this.gameThreeSchema];
  //
  public currentGame: any = this.allGames[this.gameNumber];// <= Contiene la estructura del juego actual => Ver setCurrentAdjectiveSet
  //
  public currentAdjectiveSet: string[] = [];// <= Contiene el set de adjetivos del NIVEL(gameLvl) en el que estamos => Ver setCurrentAdjectiveSet
  public currentTable: string[][] = [['', ''], ['', '']];// <= Contiene un array con los adjetivos de currentAdjetiveSet pero con la forma de la tabla; => Ver setCurrentTable
  public activeAdjectives : string[][] =[[]]; //<= La función "setCurrentAdjectiveSet()" la setea con la info del array del game / level / arrays <= Recoje desde currentGame
  //VariablesdelGameOne
  public audio: string = ''; // <= Audio de la request
  public wordGameOne : string = ''; // <= Palabra que se le envía a la request

  ngOnInit(){
    this.gameOneActiveSets(); //<== Setea los array para los 3 niveles del primer juego.
  }

  public gameOneActiveSets() : void
  {
    let maxLevels = (this.gameNumber != 2 ) ? 3 : 1;
    for ( let i  = 0 ;  i < maxLevels ; i++ ){
      this.setRowsCols(); //<= Define las variables rows y cols según el nivel en el que estamos (para el juego 3 no sirve)
      this.setCurrentAdjectiveSet(); //<= Define currentAdjetiveSet teniendo en cuenta el nivel y el juego en el que estamos.
      this.activeAdjectives[i] = this.createValidArr(this.currentAdjectiveSet); // <= Contiene todos los arrays con todas las palabras del juego activo
      this.gameLvl+=1;
    }
    this.resetValues(true); //<= Resetea a 0: rows, cols, gamelevel y if(false)gameNumber
  }

  public gameControl(): void {  // <= Se ejecuta por primera vez al hacer click
    switch (this.gameNumber) {
      case (0):
        this.requestGameOne() //<= Realiza la petición necesaria para el juego uno
        this.setRowsCols();

        let interval =  setInterval(() => { //<= Cada 100ms resetea las posiciones del contenido de currentTable
          this.currentTable =
          this.transformInTable(this.sortAdjectiveSet(this.activeAdjectives[this.gameLvl]))
        }, 100)

        setTimeout(() => {
          let reproduce = new Audio(this.audio); //<=
          reproduce.play();
          clearInterval(interval); // <= A los 3 segundos para
        }, 3000)
        console.log(this.currentTable);
        break;
      case (1):
        this.currentTable = [['']];
        this.setRowsCols();
        this.setCurrentAdjectiveSet()
        this.currentTable = this.setCurrentTable(this.currentAdjectiveSet);

        //this.resetValues();
        break;
      case (2):
        this.resetValues()
        //
        this.gameLvl = 2; // <= Es necesario para cuando pasa por la función => setCurrentAdjectiveSet o puedes usar la función setAdjetiveForLvlThree()
        this.setRowsCols();
        this.setCurrentAdjectiveSet()
        this.currentTable = this.setCurrentTable(this.currentAdjectiveSet);
    }

  }

  public requestGameOne() : void // <= realiza la petición / establece this.audio
  {
    this.chooseAWord(); // <=Coje la palabra aleatoria del current set
    this.service.getResponseJuego(this.wordGameOne).subscribe(response => {
      this.audio = response[0].phonetics[0].audio;
    });
  }

  public chooseAWord() : void { // <=Coje una palabra aleatoria de los adjetivos con los que se van a jugar en la siguiente ronda
    this.wordGameOne =
    this.activeAdjectives[this.gameLvl][this.randomNumber(this.activeAdjectives[this.gameLvl].length)];
  }

  public receptionGameOne(success : boolean) : void // <= Función que recibe si se ha acertado o no al pulsar el td desde gameOne
  {

    if(!success){ //<= Si es !false ==- true / Itera
      this.currentTable = [['', ''], ['', '']]; //<= resetea la tabla
    } else {
      this.gameLvl++;
      if(this.gameLvl > 2){
        this.resetValues()// <= resetea rows, cols y  gameLvl / suma 1 a gameNumber
      }
      this.gameControl() //Continúa el juego
    }
  }

  public createValidArr(arr: string[]): string[] { // <=Genera un array válido con el que rellenar el tablero
    let arrLength = this.rows * this.cols;
    let output = this.sortAdjectiveSet(arr, arrLength)
    return output;
  }

  public sortAdjectiveSet(arr: string[], length: number = arr.length): string[] { // <= Dado un array, mezcla adjetivos / puedes definir la longitud del nuevo array;

    let output = [];
    for (let i = 0; i < length; i++) {
      let newAdj = arr[this.randomNumber(length)];
      if (this.numRepitions(output, newAdj) < 1 ) { //Si no lo encuentra
        output.push(newAdj);
      } else {
        i--;
      }
    }
    return output;
  }
  public numRepitions(arr: string[], newItem: string): number { //<= Devuelve 1 si encuentra newItem en el array dado.
    return arr.filter((existing) => (existing === newItem)).length
  }
  public randomNumber(max: number = this.currentAdjectiveSet.length): number { // <= si no le pasas valor te coge la longitud máxima del set de adjetivos en uso

    return Math.floor(Math.random() * (max))
  }

  public transformInTable(arr: string[]): string[][] { // <= dota el array de bidimensionalidad para generar la tabla
    let output = new Array;
    for (let i = 0; i < this.rows; i++) {
      output.push(arr.splice(0, this.cols)); //corta del array y retrna.
    }

    return output;
  }


  public setCurrentTable(arr: string[]): string[][] {// <= retorna y establece el array de palabras en juego;

    return this.currentTable = this.transformInTable(this.createValidArr(arr));//Genera un array => transformInTable => devuelve el array en dos dimensiones
  }

  public setCurrentAdjectiveSet(): void { //<= Te devuelve el array de adjetivos para el gameLevel y gameNumber en el que estas
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
  public setAdjetiveForLvlThree(): string[] { //<=Te devuelve un array aleatorio para el game 3 exclusivamente
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
  public setRowsCols(): void { // <= Establece las rows y cols de los juegos 1 y 2 / no sirve para el 3
    this.rows = parseInt(this.rowsColsSchema[this.gameLvl]);
    this.cols = parseInt(this.rowsColsSchema[this.gameLvl]);
  }

  public resetValues(gameOver : boolean=false): void {
    this.rows = 0;
    this.cols = 0;
    this.gameLvl = 0;
    this.gameNumber = (gameOver) ? 0 : this.gameNumber+1;
  }




}
