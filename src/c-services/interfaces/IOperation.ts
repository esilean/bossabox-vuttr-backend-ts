export interface IOperation {
    getEventType(): IEventType
    on(eventType: string, handler: any): any
}

export interface IEventType {
    [key: string]: string
}