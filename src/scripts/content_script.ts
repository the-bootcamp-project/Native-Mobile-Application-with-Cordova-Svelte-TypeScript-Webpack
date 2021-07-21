import { Logger } from "../modules/logs";
const logger = new Logger();

(async () => {
    try {
        logger.debug("Start setInterval", "System", "Request");

        setInterval(function () {
            console.log("Content Script");
        }, 1000);

        logger.info("Successfully setInterval", "System", "Response");
    } catch (error) {
        logger.error("Unable setInterval", "System", "Error", error);
    }
})();
