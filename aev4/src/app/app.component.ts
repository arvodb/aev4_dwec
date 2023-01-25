import { Component } from '@angular/core';
import { gameOne, gameTwo, gameThree } from './english';
import { AdjetivesGameOne,AdjetivesGameTwo,AdjetivesGameThree } from './interfaces/adjetives';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(){
    this.gameControl(); // setea valores de rows y columnas en función de rowsColsSchema();
  }
  public rows : number = 0;
  public cols : number = 0;
  public gameNumber : number = 0;
  public gameLvl : number = 0;
  public rowsColsSchema : string[] = ['2','3','4'];
  public gameOneSchema : AdjetivesGameOne = gameOne;
  public gameTwoSchema : AdjetivesGameTwo = gameTwo;
  public gameThreeSchema : AdjetivesGameThree = gameThree;
  public allGames : [AdjetivesGameOne,AdjetivesGameTwo,AdjetivesGameThree] = [this.gameOneSchema,this.gameTwoSchema,this.gameThreeSchema];
  public currentGame : any = this.allGames[this.gameNumber];
  public currentAdjetiveSet : string[] = this.setCurrentAdjetiveSet();
  public currentTable :string[][] = [[]];
  public gameControl() : void 
  {

    switch(this.gameNumber)
    {
      case 0:
        this.setRowsCols();
        this.currentTable = this.setCurrentTable();
        break;
    }
  }

  public createValidArr() : string[][]
  {
    const arrLength = this.rows * this.cols;
    const output = new Array;

    for(let i = 0; i < arrLength; i++){
      let newAdj = this.currentAdjetiveSet[this.randomNumber()];
      if(this.numRepitions(output,newAdj) === 1){ //si solo se encuentra una vez
        output.push(newAdj);
      } else {
        i--;
      }
    }
    console.log(this.transformInTable(output));
    return this.transformInTable(output);
  }
  public numRepitions(arr: string[], newItem: string): number {
    return arr.filter((existing) => (existing === newItem)).length
  }
  public randomNumber(): number {
    return Math.floor(Math.random() * (this.currentAdjetiveSet.length))
  }
  //dota el array de bidimensionalidad para generar la tabla
  public transformInTable(arr: string[]): string[][] {
    let output = new Array;
    for (let i = 0; i < this.rows; i++) {
      output.push(arr.splice(0, this.cols));
    }
    return output;
  }

  //retorna el set de palabras en juego;
  public setCurrentTable() : string[][]
  {
    return this.currentTable = this.createValidArr();
  }
  public setCurrentAdjetiveSet() : string[]
  {
    let adjetiveSet = [];
    switch(this.gameLvl){
      case 0:
        adjetiveSet = this.currentGame.levelOne.adjectivesOne;
        break;
      case 1:
        adjetiveSet = this.currentGame.levelTwo.adjectivesOne;
        break;
      case 2:
        adjetiveSet.push(this.currentGame.levelThree.AdjetivesGameOne);
        adjetiveSet.push(this.currentGame.levelThree.AdjetivesGameTwo);
        adjetiveSet.push(this.currentGame.levelThree.AdjetivesGameThree);
        break;
    }
    return adjetiveSet;
  }

  //Setea las rows y cols en juego.
  public setRowsCols() : void
  {
    this.rows = parseInt(this.rowsColsSchema[this.gameNumber]);
    this.cols = parseInt(this.rowsColsSchema[this.gameNumber]);
  }


}

/* 
public createValidArr(colorSet: string[]): string[][] {
    let arrLength = this.rows * this.columns;
    
    let output = new Array;
    for (let i = 0; i < arrLength; i++) {
      let color = colorSet[this.randomNumber(colorSet)];
      if (this.numRepitions(output, color) === this.reps) {
        i--;
      } else {
        output.push(color);
      }
    }
    return this.transformInTable(output);
  }
  public numRepitions(arr: string[], newColor: string): number {
    return arr.filter((existing) => (existing === newColor)).length
  }

  public transformInTable(arr: string[]): string[][] {
    let output = new Array;
    for (let i = 0; i < this.rows; i++) {
      output.push(arr.splice(0, this.columns));
    }
    return output;
  }
  public setCurrentTable(colorSet: string[]): string[][] {
    return this.currentTable = this.createValidArr(colorSet);
  }
  

  public randomNumber(arr: string[]): number {
    return Math.floor(Math.random() * (arr.length))
  }


*/