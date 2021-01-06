import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FreeTurn } from 'src/models/freeTurn.model';
import { Turns } from 'src/models/turns.model';
import { TurnService } from '../turn.service';

@Component({
  selector: 'app-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss']
})
export class TurnComponent implements OnInit {

  myDate!: string;
  dateBefore: boolean = false;
  today: Date = new Date();
  turn: Turns = new Turns();
  allTurns: Turns[] = [];
  freeTurns!: FreeTurn;
  create!: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private turnServies: TurnService, private dialogRef: MatDialogRef<TurnComponent>) {
    this.turn = data.turn;
    this.allTurns = data.allTurns;
    this.create = data.create;
  }

  ngOnInit(): void {
  }

  getTurns() {
    if (!this.myDate) return;
    let turnDate = Date.parse(this.turn.turnDate)
    let now = Date.parse(new Date().toDateString());
    if (now > turnDate)
      this.dateBefore = true;
    let turnByDate: string[] = [];
    if (this.turnServies.freeTurns.filter(x => x.date == this.myDate).length == 0) {
      this.turnServies.getAllFreeTurns(this.myDate).subscribe(x => {
        turnByDate = x;
        this.getFreeTurns(turnByDate);
      })
    }
    else {
      turnByDate = this.turnServies.freeTurns.filter(x => x.date == this.myDate)[0].turns;
      this.getFreeTurns(turnByDate);
    }

  }
  getFreeTurns(turnByDate: string[]) {
    var turn: FreeTurn = new FreeTurn();
    turn.turns = [];
    turn.date = this.myDate;
    this.allTurns.forEach(
      t => {
        if (turnByDate.indexOf(t.turnDate) != -1) {
          const index = turnByDate.indexOf(t.turnDate);
          if (index > -1) {
            turnByDate.splice(index, 1);
          }
        }
      }
    )
    turn.turns = turnByDate;
    this.freeTurns = turn;
    this.turnServies.freeTurns.push(turn);
  }
  ok() {
    if (this.create == true)
      this.createTurn();
    else
      this.update();
  }
  createTurn() {
    if (!this.turn.turnDate) return;
    let turnDate = Date.parse(this.turn.turnDate)
    let now = Date.parse(new Date().toDateString());
    console.log(now, turnDate)
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
  update() {
    this.dialogRef.close(this.turn);
  }
}


