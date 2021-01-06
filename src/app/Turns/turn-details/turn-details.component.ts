import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TurnDetails } from 'src/models/turnDetails.model';
import { TurnService } from '../turn.service';
import { TurnComponent } from '../turn/turn.component';

@Component({
  selector: 'app-turn-details',
  templateUrl: './turn-details.component.html',
  styleUrls: ['./turn-details.component.scss']
})
export class TurnDetailsComponent implements OnInit {

  turn: TurnDetails = new TurnDetails();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private turnServies: TurnService) {
    console.log(data.turnId);
    this.turn.turnId = data.turnId;
  }

  ngOnInit(): void {
    this.turnServies.getTurnDetails(this.turn.turnId).subscribe(
      x => this.turn = x
    )
  }
}
