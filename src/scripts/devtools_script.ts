import { browser } from "webextension-polyfill-ts";

import { DEF_APP_NAME, DEF_APP_ICON } from "../constants";

import { Logger } from "../modules/logs";
const logger = new Logger();

try {
    browser.devtools.panels.create(DEF_APP_NAME, DEF_APP_ICON, "devtools_panel.html");
} catch (error) {
    logger.error("Unable devtools.panels.create", "System", "Error", error);
}
