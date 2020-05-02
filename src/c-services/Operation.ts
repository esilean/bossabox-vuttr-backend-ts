import { EventEmitter } from "events";
import { IEventType } from "./interfaces/IOperation";

class Operation extends EventEmitter {

    private eventTypes: IEventType = {}

    constructor(eventTypes: Array<string>) {
        super()
        this.eventTypes = createEventTypes(eventTypes)
    }

    getEventTypes() {
        return this.eventTypes
    }

    on(eventType: string, handler: any) {
        if (this.eventTypes[eventType]) {
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