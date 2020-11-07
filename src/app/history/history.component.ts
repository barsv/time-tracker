import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { HistoryItem } from '../history-item';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private _historyService: HistoryService) { 
    this.currentItem = this._createNewItem();
  }

  historyItems: HistoryItem[];

  currentItem: HistoryItem;

  delete(historyItem: HistoryItem): void {
    this._historyService.delete(historyItem);
  }

  stop(): void {
    this.isRunning = false;
    this.currentTimer.unsubscribe();
    if (this.currentItem.id == 0){
      this._historyService.add(this.currentItem);
    }
    this.currentItem = this._createNewItem();
  }

  startStop(): void {
    if (this.isRunning){
      this.stop();
    } else {
      this.start();
    }
  }

  private _createNewItem(): HistoryItem {
    return new HistoryItem({
      id: 0, description: '', duration: 0
    });
  }

  currentTimer: Subscription;
  isRunning: boolean;
  start(): void {
    if (this.isRunning){
      return;
    }
    this.isRunning = true;
    this.currentTimer = timer(0, 1000).subscribe(_ => {
      this.currentItem.duration++;
    });
  }

  blur(){
    this.save();
  }

  restart(historyItem: HistoryItem): void {
    // stop the current task if running
    if (this.isRunning){
      this.stop();
    }
    // reposition the selected item to the top
    this._historyService.delete(historyItem);
    this._historyService.add(historyItem);
    // make the selected item to be the current item
    this.currentItem = historyItem;
    // start the current task
    this.start();
  }

  setDuration(historyItem: HistoryItem, value: string): void {
    historyItem.durationString = value;
  }

  save(): void {
    this._historyService.save();
  }

  ngOnInit(): void {
    this._historyService.getHistoryItems()
      .subscribe(historyItems => this.historyItems = historyItems);
  }

}
