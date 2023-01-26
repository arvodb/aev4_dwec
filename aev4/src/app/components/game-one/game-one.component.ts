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
  @Output() sortAdjetiveSet = new EventEmitter<string[]>();
  public checkSort : boolean = false;
  public gameAdjetiveSet : string[] = this.currentAdjectiveSet;
  public gameCurrentTable : string[][] = this.currentTable

  public sortPositions() : void
  {
    this.sortAdjetiveSet.emit(this.currentAdjectiveSet)
  }
  public sort() : void
  {
    if (this.gameStart == true){
      setInterval(() => {
        this.sortPositions();
        console.log('hola')
      }, 100)
      //A los tres segundos la variable verdadero sera falso y no entrará en el método.
      setTimeout(() => {
        this.gameStart = false;
      }, 3000)
    }
  }
  ngOnInit(): void{
    this.sort();
  }
}


/*   @Output() level = new EventEmitter<number>();
  @Input() way : number = 0; */
