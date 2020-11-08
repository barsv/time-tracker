import { HistoryItem } from './history-item';

describe('HistoryItem', () => {
    it('should set duration correctly', () => {
        let item1 = new HistoryItem();
        item1.durationString = "00:30";
        expect(item1.durationString).toBe("00:30");
        let item2 = new HistoryItem();
        item2.durationString = "30:30";
        expect(item2.durationString).toBe("30:30");
        let item3 = new HistoryItem();
        item3.durationString = "1:13:30:00";
        expect(item3.durationString).toBe("1:13:30:00");
    });
});
