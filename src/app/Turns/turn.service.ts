import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from 'src/data.class';
import { FreeTurn } from 'src/models/freeTurn.model';
import { TurnDetails } from 'src/models/turnDetails.model';
import { Turns } from 'src/models/turns.model';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  baseUrl = new Data().basePath + 'Turns/';
  freeTurns: FreeTurn[] = [];

  constructor(private http: HttpClient) { }

  getAllWaitngToTurns() {
    return this.http.get<Turns[]>(this.baseUrl + 'GetAllWatingToTurns');
  }
  getTurnDetails(turnId: number) {
    return this.http.get<TurnDetails>(this.baseUrl + 'GetTurnDetails?turnId=' + turnId);
  }
  deleteTurn(turnId: number) {
    return this.http.get<TurnDetails>(this.baseUrl + 'DeleteTurn?turnId=' + turnId);
  }
  updateTurn(turnId: number, turnDate: string) {
    return this.http.get<TurnDetails>(this.baseUrl + 'UpdateTurn?turnId=' + turnId + '&turnDate=' + turnDate);
  }
  createTurn(turnDate: string, userId: number) {
    return this.http.get<TurnDetails>(this.baseUrl + 'CreateTurn?turnDate=' + turnDate + '&userId=' + userId)
  }
  getAllFreeTurns(date: Date) {
    return this.http.get<Date[]>(this.baseUrl + 'GetAllFreeTurns?date=' + date);
  }
}
