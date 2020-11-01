import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HistoryItem } from './history-item';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() {
    let historyItemsJson = localStorage.getItem('_historyItems');
    if (historyItemsJson){
      this._historyItems = JSON.parse(historyItemsJson);
    }
  }

  private _historyItems: HistoryItem[] = [];


  getHistoryItems(): Observable<HistoryItem[]>{
    return of(this._historyItems);
  }

  delete(historyItem: HistoryItem): void {
    var index = this._historyItems.indexOf(historyItem);
    this._historyItems.splice(index, 1);
    this.save();
  }

  add(historyItem): void {
    this._historyItems.unshift(historyItem);
    this.save();
  }

  save(): void{
    localStorage.setItem('_historyItems', JSON.stringify(this._historyItems));
  }

}
