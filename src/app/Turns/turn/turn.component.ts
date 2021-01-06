import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Turns } from 'src/models/turns.model';
import { TurnService } from '../turn.service';

@Component({
  selector: 'app-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss']
})
export class TurnComponent implements OnInit {
  
  myDate: Date=new Date();
  today: Date = new Date();
  turn: Turns = new Turns();
  allTurns: Turns[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private turnServies: TurnService, private dialogRef: MatDialogRef<TurnComponent>) {
    this.turn = data.turn;
    this.allTurns = data.allTurns;
  }
 
  ngOnInit(): void {
  }
  createTurn() {
    if (!this.turn.turnDate) return;
    let turnDate = Date.parse(this.turn.turnDate)
    let now = Date.parse(this.today.toDateString());

    if (this.allTurns.filter(x => x.turnDate.indexOf(this.turn.turnDate) > -1).length < 2 && turnDate > now)
      this.turnServies.createTurn(this.turn.turnDate, this.turn.userId).subscribe(
        x => this.dialogRef.close()
      )
    else
      if (turnDate < now)
        this.turn.dateBefore = true;
      else
        this.turn.validDate = true;
  }
  getFreeTurns() {
    this.turnServies.getAllFreeTurns(this.myDate).subscribe(x => console.log(x))
  }

}
