import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatPaginatorModule
  ],
  exports:[
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
