class DataStore {
    static _prevEvents = {};
    static _endCount;
    static _startCount;
    static maxEvents = 12;

    static get prevEvents() {
        return this._prevEvents;
    }

    static set prevEvents(event) {
        if (Object.keys(this._prevEvents).length > this.maxEvents) this._prevEvents = {};
        this._prevEvents[event.id] = event.name;
    }

    static get endCount() {
        return this._endCount;
    }

    static set endCount(bool) {
        this._endCount = bool;
    }

    static get startCount() {
        return this._startCount;
    }

    static set startCount(sec) {
        clearTimeout(this._startCount);

        this._endCount = new Promise(resolve =>
            this._startCount = setTimeout(() =>
                resolve(true),
                sec * 1000
            )
        );
    }
}

export { DataStore };
