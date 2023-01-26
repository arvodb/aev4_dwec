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



  ngOnInit(): void{

  }
}


/*   @Output() level = new EventEmitter<number>();
  @Input() way : number = 0; */
