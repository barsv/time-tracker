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

  constructor(private historyService: HistoryService) { }

  historyItems: HistoryItem[];

  currentItem: HistoryItem = <HistoryItem> {
    id: 3, title: '', duration: 0
  };

  delete(historyItem: HistoryItem): void {
    this.historyService.delete(historyItem);
  }

  stop(): void {
    this.pause();
    this.historyService.add(this.currentItem);
    this.currentItem = <HistoryItem>{
      id: 3, title: '', duration: 0
    };
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

  pause(): void {
    this.isRunning = false;
    this.currentTimer.unsubscribe();
  }

  restart(historyItem: HistoryItem): void {
    this.delete(historyItem);
    if (this.currentItem.duration > 0){
      this.stop();
    }
    this.start();
    this.currentItem = historyItem;
  }

  ngOnInit(): void {
    this.historyService.getHistoryItems()
      .subscribe(historyItems => this.historyItems = historyItems);
  }

}
