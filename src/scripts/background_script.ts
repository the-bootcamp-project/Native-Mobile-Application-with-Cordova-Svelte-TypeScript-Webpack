import { browser, Runtime } from "webextension-polyfill-ts";

import { Logger } from "../modules/logs";
const logger = new Logger();

import { System } from "../modules/system";
import { UserData } from "../modules/userdata";
import { Bookmarks } from "../modules/browser";
// import { URLChecker, Parser } from '../modules/crawler'

/**
 *
 *
 *
 */
browser.runtime.onInstalled.addListener(
    async ({ reason }: Runtime.OnInstalledDetailsType): Promise<void> => {
        switch (reason) {
            case "install": {
                try {
                    logger.debug("Start system.initialization()", "System", "Request");

                    const system = new System();
                    const response = await system.initialization();

                    if (response?.ok) {
                        const url = browser.runtime.getURL("welcome.html");
                        await browser.tabs.create({ url });
                        logger.info("Successfully system.initialization()", "System", "Response");
                    }
                } catch (error) {
                    logger.error("Unable system.initialization()", "System", "Error", error);
                    const url = browser.runtime.getURL("error.html");
                    await browser.tabs.create({ url });
                }
                break;
            }

            case "update": {
                try {
                    logger.debug("Start getURL('whats_new.html')", "System", "Request");

                    const url = browser.runtime.getURL("whats_new.html");
                    await browser.tabs.create({ url });

                    logger.info("Successfully getURL('whats_new.html')", "System", "Response");
                } catch (error) {
                    logger.error("Unable getURL('whats_new.html')", "System", "Error", error);
                }
                break;
            }
            // case "browser_update": {
            //    break;
            // }
        }
    }
);
// browser.runtime.setUninstallURL("https://bookmalyzer.app/uninstall");

/**
 *
 *
 *
 *
 */
browser.bookmarks.onCreated.addListener(async (id) => {
    try {
        const user = new UserData();
        const userData = await user.readUserData();

        if (!userData?.userID && userData?.disclaimer.bookmarksObserverAdd) {
            const bookmarks = new Bookmarks();
            const response = await bookmarks.createBookmarkDocByID(id, userData?.userID);

            console.log(response);
        }
    } catch (error) {
        console.log(error);
        console.trace();
    }
});

/**
 *
 *
 *
 *
 */
browser.bookmarks.onRemoved.addListener(async (id) => {
    try {
        const user = new UserData();
        const userData = await user.readUserData();
        if (userData?.disclaimer.bookmarksObserverDel) {
            const bookmarks = new Bookmarks();
            const response = await bookmarks.deleteBookmarkDocByID(id);

            console.log(response);
        }
    } catch (error) {
        console.log(error);
        console.trace();
    }
});

// browser.tabs.onActivated.addListener(async (activeInfo: Tabs.OnActivatedActiveInfoType) => {
//   console.log(activeInfo)
// })

/**
 *
 *
 *
 *
 */
// browser.tabs.onUpdated.addListener(async (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tabInfo: Tabs.Tab) => {
//   const user = new UserData()
//   const userData = await user.readUserData()

//   if (userData?.disclaimer.tabsObserverInfo) {
//     // if (tabInfo.url) {
//     //   const checker = new URLChecker()
//     //   if (await checker.isValidURL(tabInfo.url)) {
//     //     const parser = new Parser()
//     //     console.log(await parser.getHead(tabInfo.url))
//     //     //console.log(await checker.hasCSP(tabInfo.url))
//     //     //console.log({ tabId, changeInfo, tabInfo })
//     //   }
//     // }
//   }
// })

/**
 *
 *
 *
 *
 */
// browser.tabs.onUpdated.addListener(async (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tabInfo: Tabs.Tab) => {
//   const user = new UserData()
//   const userData = await user.readUserData()

//   if (userData?.disclaimer.tabsObserverAdd) {
//     // if (tabInfo.url) {
//     //   const checker = new URLChecker()
//     //   if (await checker.isValidURL(tabInfo.url)) {
//     //     const parser = new Parser()
//     //     console.log(await parser.getHead(tabInfo.url))
//     //     //console.log(await checker.hasCSP(tabInfo.url))
//     //     //console.log({ tabId, changeInfo, tabInfo })
//     //   }
//     // }
//   }
// })

// ;(async () => {
//   console.log(browser.runtime.getManifest())
// })()
// ;(async () => {
//   console.log(await browser.runtime.getPlatformInfo())
// })()
// ;(async () => {
//   console.log(await browser.runtime.getBrowserInfo())
// })()
// ;(async () => {
//   console.log(await browser.management.getAll())
// })()

// browser.idle.setDetectionInterval(15)
// browser.idle.onStateChanged.addListener((newState: Idle.IdleState) => {
//   console.log(newState)
// })
