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
    this.pause();
    if (this.currentItem.id == 0){
      this._historyService.add(this.currentItem);
    }
    this.currentItem = this._createNewItem();
  }

  private _createNewItem(): HistoryItem {
    return new HistoryItem({
      id: 0, title: '', duration: 0
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
      if (this.currentItem.duration == NaN){
        let time = this.currentItem.durationString.split(':');
        let hours = +time[0];
        let min = +time[1];
        let sec = +time[2];
        this.currentItem.duration = hours*60*60+min*60+sec;
      }
      this.currentItem.duration++;
    });
  }

  pause(): void {
    this.isRunning = false;
    this.currentTimer.unsubscribe();
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

  save(): void {
    this._historyService.save();
  }

  ngOnInit(): void {
    this._historyService.getHistoryItems()
      .subscribe(historyItems => this.historyItems = historyItems);
  }

}
