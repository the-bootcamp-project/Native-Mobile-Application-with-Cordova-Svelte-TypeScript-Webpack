import { browser, Tabs as TabsNS, ExtensionTypes } from "webextension-polyfill-ts";

import { Logger } from "../logs";
const logger = new Logger();

export type tabType = TabsNS.Tab;
export type tabsType = TabsNS.Tab[];
type readQuery = TabsNS.QueryQueryInfoType;
type contentScript = ExtensionTypes.InjectDetails;

export class Tabs {
    /**
     * @param  {string} url
     * @returns Promise
     */
    create = async (url: string): Promise<void> => {
        try {
            logger.debug("Start createTab", "System", "Request");

            const response = await browser.tabs.create({ url: url });

            logger.info("Successfully createTab", "System", "Response", response);
        } catch (error) {
            logger.error("Unable createTab", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {readQuery={currentWindow:true} queryInfo
     * @param  {true} active
     * @param  {true}} highlighted
     * @returns Promise
     */
    read = async (queryInfo: readQuery = { currentWindow: true, active: true, highlighted: true }): Promise<tabsType> => {
        try {
            logger.debug("Start getTab", "System", "Request");

            const response = await browser.tabs.query(queryInfo);

            logger.info("Successfully getTab", "System", "Response");
            return response;
        } catch (error) {
            logger.error("Unable getTab", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readCurrent = async (): Promise<tabType> => {
        try {
            logger.debug("Start getTab", "System", "Request");

            const response = await browser.tabs.getCurrent();

            logger.info("Successfully getTab", "System", "Response");
            return response;
        } catch (error) {
            logger.error("Unable getTab", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {number|number[]} tabIds
     * @returns Promise
     */
    delete = async (tabIds: number | number[]): Promise<void> => {
        try {
            logger.debug("Start removeTab", "System", "Request");

            const response = await browser.tabs.remove(tabIds);

            logger.info("Successfully removeTab", "System", "Response", response);
            return response;
        } catch (error) {
            logger.error("Unable removeTab", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {contentScript} details
     * @returns Promise
     */
    executeScript = async (details: contentScript): Promise<void> => {
        try {
            logger.debug("Start executeScript", "System", "Request");

            const response = await browser.tabs.executeScript(details);

            logger.info("Successfully executeScript", "System", "Response", response);
        } catch (error) {
            logger.error("Unable executeScript", "System", "Error", error);
            console.trace();
            return error;
        }
    };
}
