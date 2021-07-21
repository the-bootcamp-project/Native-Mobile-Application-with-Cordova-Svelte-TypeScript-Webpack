/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
type TAction = "Request" | "Response" | "Error";
type TType = "UserData" | "System" | "Database" | "Storage" | "Network" | "FrontEnd" | "UX";

// userDataRequest
// userDataResponse
// userDataError
// systemRequest
// systemResponse
// systemError
// databaseRequest
// databaseResponse
// databaseError
// storageRequest
// storageResponse
// storageError
// networkRequest
// networkResponse
// networkError
// audit
// progress
// event
// tracing

export class Logger {
    /**
     * @param  {string} message
     * @param  {TType} type
     * @param  {TAction} action
     * @param  {any} data?
     * @returns Promise
     */
    debug = async (message: string, type: TType, action: TAction, data?: any): Promise<void> => {
        console.debug({ level: 4, time: Date.now(), message, type, action, data });
    };
    /**
     * @param  {string} message
     * @param  {TType} type
     * @param  {TAction} action
     * @param  {any} data?
     * @returns Promise
     */
    info = async (message: string, type: TType, action: TAction, data?: any): Promise<void> => {
        console.info({ level: 3, time: Date.now(), message, type, action, data });
    };
    /**
     * @param  {string} message
     * @param  {TType} type
     * @param  {TAction} action
     * @param  {any} data?
     * @returns Promise
     */
    log = async (message: string, type: TType, action: TAction, data?: any): Promise<void> => {
        console.log({ level: 2, time: Date.now(), message, type, action, data });
    };
    /**
     * @param  {string} message
     * @param  {TType} type
     * @param  {TAction} action
     * @param  {any} data?
     * @returns Promise
     */
    warn = async (message: string, type: TType, action: TAction, data?: any): Promise<void> => {
        console.warn({ level: 1, time: Date.now(), message, type, action, data });
    };
    /**
     * @param  {string} message
     * @param  {TType} type
     * @param  {TAction} action
     * @param  {any} data?
     * @returns Promise
     */
    error = async (message: string, type: TType, action: TAction, data?: any): Promise<void> => {
        console.error({ level: 0, time: Date.now(), message, type, action, data });
    };
}
