import { Component,  Input, Output, EventEmitter  } from '@angular/core';
import {} from '@angular/core';

@Component({
  selector: 'app-game-one',
  templateUrl: './game-one.component.html',
  styleUrls: ['./game-one.component.css']
})
export class GameOneComponent {
  @Input() currentTable : string[][] = [[]];
  @Input() gameStart : boolean = false;
  @Input() currentAdjectiveSet : string[] = [];
  @Input() randomNumber : number = 0;
  @Output() length = new EventEmitter<number>();
  public gameAdjetiveSet : string[] = this.currentAdjectiveSet;

  ngOnInit(): void{
    this.sortingEffect();
  }
  public sortingEffect() : void
  {
    setInterval(() => {
      if (this.gameStart == true) {

/*         if (this.cont == 0) {
          this.cont = 1;
          this.prueba = "Adios";
        } else {
          this.cont = 0;
          this.prueba = "Hola";
        } */
      }
    }, 100)
    //A los tres segundos la variable verdadero sera falso y no entrará en el método.
    setTimeout(() => {
      this.gameStart = false; 
    }, 3000)
  }
  public sortingTable() : void
  {
    
  }
  public getNewRandom(){

  }
}


/*   @Output() level = new EventEmitter<number>();
  @Input() way : number = 0; */