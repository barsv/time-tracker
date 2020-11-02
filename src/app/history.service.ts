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
      var itemsPoco = JSON.parse(historyItemsJson);
      this._historyItems = itemsPoco.map(item => new HistoryItem(item));
      this._historyItems.forEach(item=>{
        if (item.id > this.maxId){
          this.maxId = item.id;
        }
      })
    }
  }

  maxId = 0;

  private _historyItems: HistoryItem[] = [];

  getHistoryItems(): Observable<HistoryItem[]>{
    return of(this._historyItems);
  }

  delete(historyItem: HistoryItem): void {
    var index = this._historyItems.indexOf(historyItem);
    this._historyItems.splice(index, 1);
    this.save();
  }

  add(historyItem: HistoryItem): HistoryItem {
    if (historyItem.id == 0){
      this.maxId++;
      historyItem.id = this.maxId;
    }
    this._historyItems.unshift(historyItem);
    this.save();
    return historyItem;
  }

  save(): void{
    localStorage.setItem('_historyItems', JSON.stringify(this._historyItems));
  }

}
