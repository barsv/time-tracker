export class HistoryItem {
    constructor(init?:Partial<HistoryItem>){
        Object.assign(this, init);
    }
    id: number;
    title: string;
    // in seconds
    _duration: number;
    set duration(newValue: number){
        this._duration = newValue;
        let sec = (newValue % 60).toFixed(0).toString().padStart(2, '0');
        let min = (newValue / 60 % 60).toFixed(0).toString().padStart(2, '0');
        let hour = (newValue / (60*60)).toFixed(0).toString().padStart(2, '0');
        this.durationString = `${hour}:${min}:${sec}`
    }
    get duration(): number {
        return this._duration;
    }
    durationString: string;
}