import { outputAst } from '@angular/compiler';
import { Component,  Input, Output, EventEmitter  } from '@angular/core';
import {} from '@angular/core';

@Component({
  selector: 'app-game-one',
  templateUrl: './game-one.component.html',
  styleUrls: ['./game-one.component.css']
})
export class GameOneComponent {
  @Input() currentTable : string[][] = [[]];
  @Input() currentAdjectiveSet : string[] = [];
  @Input() activeAdjectives : string [] = []
  //@Input() choosedAdjective : string = ''
  @Input() choosedAdjective = '';
  @Output() success  = new EventEmitter<boolean>();
  public checkAdj(adj : string) : void
  {
    console.log(adj,this.choosedAdjective);
    if(adj === this.choosedAdjective && adj){
      this.success.emit(true);
    } else {
      this.success.emit(false);
    }
  }

  ngOnInit(): void{

  }
}


/*
  @Output() level = new EventEmitter<number>();
  @Input() way : number = 0;
*/
