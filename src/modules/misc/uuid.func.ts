import { v4 as uuidv4 } from "uuid";
import { v5 as uuidv5 } from "uuid";

import { DEF_APP_URL } from "../../constants";
import { Logger } from "../logs";
const logger = new Logger();
/**
 * @returns Promise
 */
export const getUUID = async (): Promise<string | undefined> => {
    try {
        logger.debug("Start getUUID", "UserData", "Request");

        const v4 = uuidv4();
        const v5 = uuidv5(DEF_APP_URL, v4);

        logger.info("Successfully getUUID", "UserData", "Response");
        return v5;
    } catch (error) {
        logger.error("Unable getUUID", "UserData", "Error", error);
        console.trace();
    }
};
