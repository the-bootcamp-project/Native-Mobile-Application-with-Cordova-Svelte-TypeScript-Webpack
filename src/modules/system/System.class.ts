import { DEF_USERDATA_INIT } from "../userdata";
import { UserData } from "../userdata";
import { Logger } from "../logs";
const logger = new Logger();

export class System {
    initialization = async (): Promise<PouchDB.Core.Response | undefined> => {
        try {
            logger.debug("Start initialization", "UserData", "Request");

            const user = new UserData();

            const userData = DEF_USERDATA_INIT;
            userData.achievements.initialization = true;

            const response = await user.createUserData(userData);

            logger.info("Successfully initialized", "UserData", "Response", response);
            return response;
        } catch (error) {
            logger.error("Unable to initialization", "UserData", "Error", error);
            console.trace();
        }
    };
}
