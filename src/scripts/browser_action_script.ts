import { browser } from "webextension-polyfill-ts";

import { UserData } from "../modules/userdata";

// browser.browserAction.setPopup({ popup: 'bookmarks.html' })
// browser.browserAction.setIcon({ path: '/images/logo.svg' })
// browser.browserAction.setTitle({ title: 'that' })
// browser.browserAction.setBadgeText({ text: '5' })
// browser.browserAction.setBadgeBackgroundColor({ color: [217, 0, 0, 255] })
// browser.browserAction.onClicked.addListener((tab) => {
//   console.log(tab)
// })

/**
 *
 *
 *
 *
 */
browser.browserAction.onClicked.addListener(async () => {
    try {
        const user = new UserData();
        const userData = await user.readUserData();
        if (userData?.disclaimer.topSitesObserverAdd) {
            const topSites = await browser.topSites.get();
            console.log(topSites);
        }
    } catch (error) {
        console.log(error);
        console.trace();
    }
});
