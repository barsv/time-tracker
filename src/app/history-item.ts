export class HistoryItem {
    constructor(init?:Partial<HistoryItem>){
        Object.assign(this, init);
    }
    id: number;
    description: string;
    isHours: boolean;
    isDays: boolean;
    // in seconds
    _duration: number;
    set duration(newValue: number){
        this._duration = newValue;
        this.isHours = newValue >= 60 * 60 && newValue < 24 * 60 * 60;
        this.isDays = newValue >= 24 * 60 * 60;
        let secs = (newValue % 60).toFixed(0).toString().padStart(2, '0');
        let mins = (Math.floor(newValue / 60 % 60)).toFixed(0).toString().padStart(2, '0');
        let hours = (Math.floor(newValue / (60 * 60)) % 24).toFixed(0).toString().padStart(2, '0');
        let days = (Math.floor(newValue / (24 * 60 * 60))).toFixed(0).toString();
        this._durationString = this.isDays ? `${days}:${hours}:${mins}:${secs}`
            : this.isHours ? `${hours}:${mins}:${secs}`
                : `${mins}:${secs}`;
    }
    get duration(): number {
        return this._duration;
    }
    _durationString: string;
    set durationString(value: string){
        let parts = value.split(':');
        let days = parts.length > 3 ? Number(parts[0]) : 0;
        let hours = parts.length > 2 ? Number(parts[parts.length - 3]) : 0;
        let mins = Number(parts[parts.length - 2]);
        let secs = Number(parts[parts.length - 1]);
        if (isNaN(secs) || isNaN(mins) || isNaN(hours) || isNaN(days)){
            return;
        }
        this.duration = 24*60*60*days + 60*60*hours + 60*mins + secs;
    }
    get durationString(): string {
        return this._durationString;
    }
}