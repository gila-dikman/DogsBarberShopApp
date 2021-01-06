import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Turns } from 'src/models/turns.model';
import { TurnService } from '../turn.service';
import { MatDialog } from '@angular/material/dialog';
import { TurnDetailsComponent } from '../turn-details/turn-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login/login.service';
import { TurnComponent } from '../turn/turn.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-turns-table',
  templateUrl: './turns-table.component.html',
  styleUrls: ['./turns-table.component.scss']
})
export class TurnsTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['firstName', 'turnDate', 'actions'];
  turns!: MatTableDataSource<Turns>;
  filterTurns!: MatTableDataSource<Turns>;

  private _nameToSearch: string = "";
  public get nameToSearch(): string {
    return this._nameToSearch;
  }
  public set nameToSearch(value: string) {
    this._nameToSearch = value;
    this.search();
  }

  private _dateToSearch: string = "";
  public get dateToSearch(): string {
    return this._dateToSearch;
  }
  public set dateToSearch(value: string) {
    this._dateToSearch = value;
    this.search();
  }

  constructor(private turnServies: TurnService, public dialog: MatDialog, private _snackBar: MatSnackBar
    , public loginServies: LoginService) { }

  ngOnInit(): void {
    this.getTurns();
  }

  getTurns() {
    this.turnServies.getAllWaitngToTurns().subscribe(t => {
      this.turns = new MatTableDataSource(t);
      this.filterTurns = new MatTableDataSource(t);
      console.log(this.turns);
      this.filterTurns.paginator = this.paginator;
      this.search();
    })
  }
  search() {
    this.filterTurns.data = this.turns.data.filter(t => (((t.firstName.indexOf(this.nameToSearch) > -1) || this.nameToSearch == "") && (t.turnDate.indexOf(this.dateToSearch) > -1 || this.dateToSearch == "")));
    if (this.filterTurns.paginator) {
      this.filterTurns.paginator.firstPage();
    }
  }
  cancelSearch() {
    this.dateToSearch = "";
    this.nameToSearch = "";
    this.filterTurns.data = this.turns.data;
    if (this.filterTurns.paginator) {
      this.filterTurns.paginator.firstPage();
    }
  }
  openTurnDetailsDialog(turnId: number) {
    const dialogRef = this.dialog.open(TurnDetailsComponent, {
      width: '30%',
      height: '250px',
      data: {
        turnId: turnId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  delete(turnId: number) {
    console.log(this.loginServies.user);

    var snackBarRef = this._snackBar.open("האם הנך בטוח שברצונך לבטל את התור?", "ביטול מחיקה", {
      duration: 3000,
    });
    snackBarRef.afterDismissed().subscribe(
      x => {
        if (!x.dismissedByAction)
          this.turnServies.deleteTurn(turnId).subscribe(x => {
            this.getTurns();
          });
      }
    )

  }
  openSnackBar(message: string, action: string) {
    var snackref = this._snackBar.open(message, action, {
      duration: 2000,
    });
    snackref.onAction
  }
  update(turn: Turns) {
    let turnDate = Date.parse(turn.turnDate)
    let now = Date.parse(new Date().toDateString());

    if (this.turns.data.filter(x => x.turnDate == turn.turnDate).length < 2 && turnDate > now) {
      this.turnServies.updateTurn(turn.turnId, turn.turnDate).subscribe(
        x => {
          this.getTurns();
        });
    }
    else {
      if (turnDate < now)
        this.turns.data[this.turns.data.findIndex(x => x == turn)].dateBefore = true;
      else
        this.turns.data[this.turns.data.findIndex(x => x == turn)].validDate = true;
    }
  }
  openNewTurnDialog() {
    var turn: Turns = new Turns();
    turn.userId = this.loginServies.user.userId;
    turn.firstName = this.loginServies.user.firstName;
    turn.turnDate = new Date().toDateString();
    turn.validDate = false;
    const dialogRef = this.dialog.open(TurnComponent, {
      height: '230px',
      width: '300px',
      data: {
        turn: turn,
        allTurns: this.turns.data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTurns();
    });
  }
}
