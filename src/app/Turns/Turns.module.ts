import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnComponent } from './turn/turn.component';
import { TurnsTableComponent } from './turns-table/turns-table.component';
import { TurnDetailsComponent } from './turn-details/turn-details.component';
import { SharedModule } from 'src/shared/shared/shared.module';
import { MaterialModule } from 'src/material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TurnComponent,
    TurnsTableComponent,
    TurnDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ],
  exports:[
    TurnComponent,
    TurnsTableComponent,
    TurnDetailsComponent
  ],
  entryComponents:[
    TurnDetailsComponent,
    TurnComponent
  ]
})
export class TurnsModule { }
