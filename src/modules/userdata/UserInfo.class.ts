import { Logger } from "../logs";
const logger = new Logger();

export class UserInfo {
    /**
     * @returns Promise
     */
    getUserAgent = async (): Promise<string | undefined> => {
        try {
            logger.debug("Start getUserAgent", "UserData", "Request");

            const response = window.navigator.userAgent;

            logger.info("Successfully getUserAgent", "UserData", "Response");
            return response;
        } catch (error) {
            logger.error("Unable getUserAgent", "UserData", "Error", error);
            console.trace();
        }
    };
}
