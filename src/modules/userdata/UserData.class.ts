import { NIL as NIL_UUID } from "uuid";

import { IndexedDB } from "../database";
import { Logger } from "../logs";
const logger = new Logger();

const DEF_USERDATA_DOCID = "UserData";

interface IUserInfos {
    userAgent?: string;
}
interface IUserAchievements {
    initialization: boolean;
    welcome: boolean;
}
interface IUserDisclaimer {
    bookmarksAll: boolean;
    bookmarksAutoInsert: boolean;
    bookmarksObserverAdd: boolean;
    bookmarksObserverDel: boolean;
    tabsObserverInfo: boolean;
    tabsObserverAdd: boolean;
    topSitesObserverAdd: boolean;
    usageDataShare: boolean;
}

export interface IUserData {
    _id: string;
    userID: string;
    infos?: IUserInfos;
    achievements: IUserAchievements;
    disclaimer: IUserDisclaimer;
}

export const DEF_USERDATA_INIT: IUserData = {
    _id: DEF_USERDATA_DOCID,
    userID: NIL_UUID,
    infos: {
        userAgent: "",
    },
    achievements: {
        initialization: false,
        welcome: false,
    },
    disclaimer: {
        bookmarksAll: false,
        bookmarksAutoInsert: false,
        bookmarksObserverAdd: false,
        bookmarksObserverDel: false,
        tabsObserverInfo: false,
        tabsObserverAdd: false,
        topSitesObserverAdd: false,
        usageDataShare: false,
    },
};

export class UserData {
    createUserData = async (UserData: IUserData): Promise<PouchDB.Core.Response | undefined> => {
        try {
            logger.debug("Start putUserData", "UserData", "Request");

            const db = new IndexedDB();
            const response = await db.update(UserData);

            logger.info("Successfully putUserData", "UserData", "Response", response);
            return response;
        } catch (error) {
            logger.error("Unable putUserData", "UserData", "Error", error);
            console.trace();
        }
    };
    readUserData = async (): Promise<IUserData | undefined> => {
        try {
            logger.debug("Start getUserData", "UserData", "Request");

            const db = new IndexedDB();

            // TODO Type?
            const response = await db.read(DEF_USERDATA_DOCID);

            logger.info("Successfully getUserData", "UserData", "Response");
            return response;
        } catch (error) {
            logger.error("Unable getUserData", "UserData", "Error", error);
            console.trace();
        }
    };

    readUserDataID = async (): Promise<string | undefined> => {
        try {
            logger.debug("Start getUserData", "UserData", "Request");

            const db = new IndexedDB();

            // TODO Type?
            const response = await db.read(DEF_USERDATA_DOCID);

            logger.info("Successfully getUserData", "UserData", "Response");
            return response.userID;
        } catch (error) {
            logger.error("Unable getUserData", "UserData", "Error", error);
            console.trace();
        }
    };

    updateUserData = async (UserData: IUserData): Promise<PouchDB.Core.Response | undefined> => {
        try {
            logger.debug("Start putUserData", "UserData", "Request");

            const db = new IndexedDB();
            const response = await db.update(UserData);

            if (response.ok) {
                logger.info("Successfully putUserData", "UserData", "Response", response);
                return response;
            }
        } catch (error) {
            logger.error("Unable putUserData", "UserData", "Error", error);
            console.trace();
        }
    };

    updateDisclaimerBookmarksAll = async (decision: boolean): Promise<PouchDB.Core.Response | undefined> => {
        try {
            logger.debug("Start putUserData", "UserData", "Request");

            const response = await this.readUserData();

            if (response) {
                response.disclaimer.bookmarksAll = decision;
                const result = await this.updateUserData(response);

                logger.info("Successfully putUserData", "UserData", "Response", result);
                return result;
            }
        } catch (error) {
            logger.error("Unable putUserData", "UserData", "Error", error);
            console.trace();
        }
    };
}
