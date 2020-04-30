import { EventEmitter } from "events";
import { IEventType } from "./interfaces/IOperation";

class Operation extends EventEmitter {

    private _eventTypes: IEventType = {}

    constructor(eventTypes: Array<string>) {
        super()
        this._eventTypes = createEventTypes(eventTypes)
    }

    getEventTypes() {
        return this._eventTypes
    }

    on(eventType: string, handler: any) {
        if (this._eventTypes[eventType]) {
            return this.addListener(eventType, handler)
        }

        throw new Error(`Invalid eventType "${eventType}" to operation ON ${this.constructor.name}.`);
    }
}

const createEventTypes = (eventTypes: Array<string>) => {
    const obj: IEventType = eventTypes.reduce((obj, eventType) => {
        obj[eventType] = eventType
        return obj
    }, Object.create(null))

    return obj
}

export default Operation