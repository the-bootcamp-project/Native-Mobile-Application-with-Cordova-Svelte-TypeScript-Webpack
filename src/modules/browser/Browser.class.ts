import { browser } from "webextension-polyfill-ts";

import { Logger } from "../logs";
const logger = new Logger();

export class Browser {
    /**
     * @param  {string} value
     * @param  {string} color
     * @returns Promise
     */
    setPopupBadge = async (value: string, color: string): Promise<void> => {
        try {
            logger.debug("Start setPopupBadge", "System", "Request");

            browser.browserAction.setBadgeText({ text: value });
            browser.browserAction.setBadgeBackgroundColor({ color: color });

            logger.info("Successfully setPopupBadge", "System", "Response");
        } catch (error) {
            logger.error("Unable setPopupBadge", "System", "Error", error);
            console.trace();
        }
    };
}
