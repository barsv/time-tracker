import { TestBed } from '@angular/core/testing';
import { HistoryItem } from './history-item';

import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should group items by days', () => {
    let item1 = new HistoryItem();
    item1.date = new Date(2020, 11, 7);
    let item2 = new HistoryItem();
    item2.date = new Date(2020, 11, 7);
    let item3 = new HistoryItem();
    item3.date = new Date(2020, 11, 8);
    service.add(item1);
    service.add(item2);
    service.add(item3);
    var groupsByDay = service.getHistoryItems();
    expect(groupsByDay.length).toEqual(2);
  });
});
