import { browser, Bookmarks as BookmarksNS } from "webextension-polyfill-ts";
import { NIL as NIL_UUID } from "uuid";

// import { NEXT_TARGET } from '../../constants'
import { IndexedDB, indexOptions, indexResponse, findRequest, returnResponse, getOptions } from "../database";
import { MetaData } from "../crawler";
import { Logger } from "../logs";
const logger = new Logger();

export type findBookmarks = PouchDB.Find.FindResponse<BookmarkDoc[]>;
export type findCrawlerTask = PouchDB.Find.FindResponse<CrawlerTask>;

type BrowserBookmark = BookmarksNS.BookmarkTreeNode;
type BrowserBookmarks = BookmarksNS.BookmarkTreeNode[];
type DocType = "bookmark";
type Visibility = "public" | "private" | "protected";
type IndicationType = "info" | "warning" | "error";

export type BookmarkSelectionType = {
    value: string;
    parentId?: string;
    index?: number;
    url?: string;
    label: string;
    dateAdded?: number;
    dateGroupModified?: number;
    unmodifiable?: "managed";
    children?: BookmarkSelectionType[];
    type?: "bookmark" | "folder" | "separator";
};

type Indications = {
    id: string;
    type: IndicationType;
    code: number;
    text: string;
};

interface Tasks {
    requested: boolean;
    checked: boolean;
    checkedAt: number;
    testet: boolean;
    testetAt: number;
    inspected: boolean;
    inspectedAt: number;
    validated: boolean;
    validatedAt: number;
    audited: boolean;
    auditedAt: number;
    auditedBy: string;
}

export interface NewBookmarkDoc {
    docType: DocType;

    _id: string;
    title: string;
    url: string;

    bookmarkID: string;

    visibility: Visibility;

    tasks: Tasks;

    createdBy: string;
    createdAt: number;

    changed: boolean;
    changedAt: number;

    indications?: Indications[];

    status: number;

    metaData?: MetaData;
}

export interface BookmarkDoc extends NewBookmarkDoc {
    _rev: string;
}

export interface CrawlerTask extends NewBookmarkDoc {
    _rev: string;
    docType: DocType;

    _id: string;
    url: string;
}

export const BOOKMARK_PATTERN: NewBookmarkDoc = {
    docType: "bookmark",

    _id: "",
    title: "",
    url: "",

    bookmarkID: "",

    visibility: "private",

    createdBy: NIL_UUID,
    createdAt: 0,

    changed: false,
    changedAt: 0,

    status: 0,

    tasks: {
        requested: false,

        checked: false,
        checkedAt: 0,

        testet: false,
        testetAt: 0,

        inspected: false,
        inspectedAt: 0,

        validated: false,
        validatedAt: 0,

        audited: false,
        auditedAt: 0,
        auditedBy: NIL_UUID,
    },

    metaData: {},

    indications: [],
};

export class Bookmarks {
    /**
     * @returns Promise
     */
    readBrowserBookmarkTree = async (): Promise<BrowserBookmarks> => {
        try {
            logger.debug("Start readBrowserBookmarkTree", "System", "Request");

            const response = await browser.bookmarks.getTree();

            logger.info("Successfully readBrowserBookmarkTree", "System", "Response");
            return response;
        } catch (error) {
            logger.error("Unable readBrowserBookmarkTree", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {string} bookmarkID
     * @returns Promise
     */
    readBrowserBookmarkByID = async (bookmarkID: string): Promise<BrowserBookmark | undefined> => {
        try {
            logger.debug("Start readBrowserBookmarkByID", "System", "Request");

            const response = await browser.bookmarks.getSubTree(bookmarkID);

            if (response[0].type === "bookmark") {
                logger.info("Successfully readBrowserBookmarkByID", "System", "Response");
                return response[0];
            }
        } catch (error) {
            logger.error("Unable readBrowserBookmarkByID", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {string[]} bookmarkIDs
     * @returns Promise
     */
    readBrowserBookmarksByIDs = async (bookmarkIDs: string[]): Promise<BrowserBookmarks | undefined> => {
        try {
            logger.debug("Start readBrowserBookmarksByIDs", "System", "Request");

            const bookmarks: BrowserBookmarks = [];

            for (let i = 0; i < bookmarkIDs.length; i++) {
                const browserBookmark = await this.readBrowserBookmarkByID(bookmarkIDs[i]);

                if (browserBookmark && browserBookmark.type === "bookmark") {
                    bookmarks.push(browserBookmark);
                }
            }

            logger.info("Successfully readBrowserBookmarksByIDs", "System", "Response");
            return bookmarks;
        } catch (error) {
            logger.error("Unable readBrowserBookmarksByIDs", "System", "Error", error);
            console.trace();
            return error;
        }
    };

    /*********************************************************************************************************/

    // TODO WebWorker!?
    /**
     * @returns Promise
     */
    readBrowserBookmarkIDsList = async (): Promise<string[] | undefined> => {
        try {
            logger.debug("Start readBrowserBookmarkIDsList", "System", "Request");

            const tree = await this.readBrowserBookmarkTree();

            if (tree) {
                const treeString = JSON.stringify(tree[0].children);
                const listTree = treeString.match(new RegExp('"id":"(.*?)"', "gmi"));

                if (listTree) {
                    const browserBookmarkIDsList = [];

                    for (const id of listTree) {
                        const BrowserEntryID = id.replace('"id":"', "").replace('"', "");
                        const BrowserBookmark = await this.readBrowserBookmarkByID(BrowserEntryID);

                        if (BrowserBookmark) {
                            browserBookmarkIDsList.push(BrowserBookmark.id);
                        }
                    }

                    logger.info("Successfully readBrowserBookmarkIDsList", "System", "Response");
                    return browserBookmarkIDsList;
                }
            }
        } catch (error) {
            logger.error("Unable readBrowserBookmarkIDsList", "System", "Error", error);
            console.trace();
            return error;
        }
    };

    /*********************************************************************************************************/
    /**
     * @returns Promise
     */
    createBrowserBookmarkSelection = async (): Promise<BookmarkSelectionType | undefined> => {
        try {
            logger.debug("Start createBrowserBookmarkSelection", "System", "Request");

            // TODO empty folder are a problem
            const tree = await this.readBrowserBookmarkTree();
            if (tree) {
                const treeString = JSON.stringify(tree[0].children).replaceAll(new RegExp('"id"', "gmi"), '"value"').replaceAll(new RegExp('"title"', "gmi"), '"label"');

                const resonse = JSON.parse(treeString);

                logger.info("Successfully createBrowserBookmarkSelection", "System", "Response");
                return resonse;
            }
        } catch (error) {
            logger.error("Unable createBrowserBookmarkSelection", "System", "Error", error);
            console.trace();
            return error;
        }
    };

    /****************************************************************************************/
    /**
     * @param  {indexOptions} index
     * @returns Promise
     */
    createBookmarkDocIndex = async (index: indexOptions): Promise<indexResponse> => {
        try {
            logger.debug("Start createBookmarkDocIndex", "Database", "Request");

            const db = new IndexedDB();
            const resonse = await db.createIndex(index);

            logger.info("Successfully createBookmarkDocIndex", "Database", "Response", resonse);
            return resonse;
        } catch (error) {
            logger.error("Unable createBookmarkDocIndex", "Database", "Error", error);
            console.trace();
            return error;
        }
    };

    /*********************************************************************************************************/
    /**
     * @param  {BrowserBookmark} bookmark
     * @param  {string} UserID
     * @returns Promise
     */
    createBookmarkDocTemplate = async (bookmark: BrowserBookmark, UserID: string): Promise<NewBookmarkDoc | undefined> => {
        try {
            logger.debug("Start createBookmarkDocTemplate", "System", "Request");

            if (UserID && bookmark.id && bookmark.url && bookmark.title && bookmark.type === "bookmark") {
                const bookmarkDoc: NewBookmarkDoc = BOOKMARK_PATTERN;

                bookmarkDoc._id = `bookmark_${bookmark.id}`;
                bookmarkDoc.bookmarkID = bookmark.id;
                bookmarkDoc.url = bookmark.url;
                bookmarkDoc.title = bookmark.title;
                bookmarkDoc.docType = bookmark.type;
                bookmarkDoc.createdBy = UserID;

                logger.info("Successfully createBookmarkDocTemplate", "System", "Response");
                return bookmarkDoc;
            }
        } catch (error) {
            logger.error("Unable createBookmarkDocTemplate", "System", "Error", error);
            console.trace();
            return error;
        }
    };

    /*********************************************************************************************************/
    /**
     * @param  {BrowserBookmark} browserBookmark
     * @param  {string} UserID
     * @returns Promise
     */
    createBookmarkDoc = async (browserBookmark: BrowserBookmark, UserID: string): Promise<returnResponse | undefined> => {
        try {
            logger.debug("Start createBookmarkDoc", "Database", "Request");

            const bookmarkDoc = await this.createBookmarkDocTemplate(browserBookmark, UserID);

            if (bookmarkDoc) {
                const db = new IndexedDB();
                const response = await db.create(bookmarkDoc);

                logger.info("Successfully createBookmarkDoc", "Database", "Response", response);
                return response;
            }
        } catch (error) {
            logger.error("Unable createBookmarkDoc", "Database", "Error", error);
            console.trace();
        }
    };
    /**
     * @param  {string} bookmarkID
     * @param  {string} UserID
     * @returns Promise
     */
    createBookmarkDocByID = async (bookmarkID: string, UserID: string): Promise<returnResponse | undefined> => {
        try {
            logger.debug("Start createBookmarkDocByID", "Database", "Request");
            const browserBookmark = await this.readBrowserBookmarkByID(bookmarkID);

            if (browserBookmark) {
                const response = await this.createBookmarkDoc(browserBookmark, UserID);

                logger.info("Successfully createBookmarkDocByID", "Database", "Response", response);
                return response;
            }
        } catch (error) {
            logger.error("Unable createBookmarkDocByID", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {string[]} bookmarkIDs
     * @param  {string} UserID
     * @returns Promise
     */
    createBookmarkDocsByIDs = async (bookmarkIDs: string[], UserID: string): Promise<returnResponse[] | undefined> => {
        try {
            logger.debug("Start createBookmarkDocsByIDs", "Database", "Request");

            const bookmarksList = await this.readBrowserBookmarksByIDs(bookmarkIDs);

            const responses: returnResponse[] = [];

            if (bookmarksList) {
                for (let i = 0; i < bookmarksList.length; i++) {
                    if (bookmarksList) {
                        const response = await this.createBookmarkDoc(bookmarksList[i], UserID);
                        if (response) {
                            responses.push(response);
                        }
                    }
                }

                logger.info("Successfully createBookmarkDocsByIDs", "Database", "Response");
                return responses;
            }
        } catch (error) {
            logger.error("Unable createBookmarkDocsByIDs", "Database", "Error", error);
            console.trace();
            return error;
        }
    };

    // TODO WebWorker!?
    /**
     * @param  {string} UserID
     * @returns Promise
     */
    createBookmarkDocsAll = async (UserID: string): Promise<returnResponse[] | undefined> => {
        try {
            const browserBookmarksIDsList = await this.readBrowserBookmarkIDsList();

            if (browserBookmarksIDsList) {
                const responses: returnResponse[] = [];

                for (let i = 0; i < browserBookmarksIDsList.length; i++) {
                    const browserBookamrk = await this.readBrowserBookmarkByID(browserBookmarksIDsList[i]);

                    if (browserBookamrk) {
                        const response = await this.createBookmarkDoc(browserBookamrk, UserID);

                        if (response) {
                            responses.push(response);
                        }
                    }
                }

                logger.info("Successfully createBookmarkDocsAll", "Database", "Response");
                return responses;
            }
        } catch (error) {
            logger.error("Unable createBookmarkDocsAll", "Database", "Error", error);
            console.trace();
        }
    };
    /**
     * @param  {indexOptions} index
     * @param  {findRequest} query
     * @returns Promise
     */
    readBookmarkDocs = async (index: indexOptions, query: findRequest): Promise<findBookmarks | undefined> => {
        try {
            logger.debug("Start readBookmarkDocs", "Database", "Request");

            const responseIndex = await this.createBookmarkDocIndex(index);

            if (responseIndex) {
                if (responseIndex?.result) {
                    const db = new IndexedDB();
                    const response = await db.find(query);

                    logger.info("Successfully readBookmarkDocs", "Database", "Response");
                    return response;
                }
            }
        } catch (error) {
            logger.error("Unable readBookmarkDocs", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {string} bookmarkID
     * @param  {getOptions} options?
     * @returns Promise
     */
    readBookmarkDocByID = async (bookmarkID: string, options?: getOptions): Promise<BookmarkDoc | undefined> => {
        try {
            logger.debug("Start readBookmarkDocByID", "Database", "Request");

            const db = new IndexedDB();

            const response = await db.read(bookmarkID, options);

            logger.info("Successfully readBookmarkDocByID", "Database", "Response");
            return response;
        } catch (error) {
            logger.error("Unable readBookmarkDocByID", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {string} bookmarkID
     * @param  {getOptions} options?
     * @returns Promise
     */
    updateBookmarkDoc = async (bookmark: BookmarkDoc): Promise<returnResponse> => {
        try {
            logger.debug("Start readBookmarkDocByID", "Database", "Request");

            const db = new IndexedDB();
            const response = await db.update(bookmark);

            logger.info("Successfully readBookmarkDocByID", "Database", "Response");
            return response;
        } catch (error) {
            logger.error("Unable readBookmarkDocByID", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {string} bookmarkID
     * @returns Promise
     */
    deleteBookmarkDocByID = async (bookmarkID: string): Promise<returnResponse | undefined> => {
        try {
            logger.debug("Start deleteBookmarkDocByID", "Database", "Request");
            if (bookmarkID) {
                const response = await this.readBookmarkDocByID(`bookmark_${bookmarkID}`);

                if (response) {
                    const db = new IndexedDB();
                    const responseDelete = await db.delete(response);

                    logger.info("Successfully deleteBookmarkDocByID", "Database", "Response");
                    return responseDelete;
                }
            }
        } catch (error) {
            logger.error("Unable deleteBookmarkDocByID", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {indexOptions} index
     * @param  {findRequest} query
     * @returns Promise
     */
    readBookmarkDocsByType = async (type: string): Promise<findBookmarks | undefined> => {
        try {
            const index = { index: { fields: ["docType"], name: "inspector", ddoc: "inspector", type: "json" } };

            const query = {
                selector: { docType: "bookmark" },
                fields: ["docType", "_id", "title", "url"],
                limit: 10,
            };

            const response = await this.readBookmarkDocs(index, query);

            if (response) {
                logger.info("Successfully readBookmarkDocsByType", "Database", "Response");
                return response;
            }
        } catch (error) {
            logger.error("Unable readBookmarkDocsByType", "Database", "Error", error);
            console.trace();
            return error;
        }
    };

    /*********************************************************************************************************/

    // TODO
    /**
     * @param  {string} tabURL
     * @returns Promise
     */
    readIsBookmarked = async (tabURL: string): Promise<boolean | undefined> => {
        try {
            logger.debug("Start readIsBookmarked", "Database", "Request");

            const db = new IndexedDB();

            const query = {
                index: { fields: ["docType", "url"], name: "inspector", ddoc: "inspector", type: "json" },
                selector: { docType: "bookmark", url: tabURL },
                fields: ["docType", "url"],
            };

            await db.createIndex({ index: query.index });

            const isBookmarked = await db.find({ selector: query.selector, fields: query.fields });
            const response = isBookmarked?.docs.length ? true : false;

            logger.info("Successfully readIsBookmarked", "Database", "Response");
            return response;
        } catch (error) {
            logger.error("Unable readIsBookmarked", "Database", "Error", error);
            console.trace();
            return error;
        }
    };

    readCrawlerTask = async (): Promise<findCrawlerTask | undefined> => {
        try {
            const index = {
                index: {
                    fields: ["docType", "_id", "_rev", "url", "tasks.requested"],
                    name: "crawlertask",
                    ddoc: "crawlertask",
                    type: "json",
                },
            };

            const query = {
                selector: { docType: "bookmark", "tasks.requested": { $eq: true }, "indications.requested": { $eq: true } },
                fields: ["docType", "_id", "_rev", "url", "tasks.requested"],
                limit: 1,
            };

            const responseIndex = await this.createBookmarkDocIndex(index);

            if (responseIndex) {
                if (responseIndex?.result) {
                    const db = new IndexedDB();
                    const response = await db.find(query);

                    logger.info("Successfully readCrawlerTask", "Database", "Response");
                    return response;
                }
            }
        } catch (error) {
            logger.error("Unable readCrawlerTask", "Database", "Error", error);
            console.trace();
            return error;
        }
    };

    readBookmarkDocsInspectorTask = async (
        BookmarkIndex: PouchDB.Find.CreateIndexOptions,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        BookmarkQuery: PouchDB.Find.FindRequest<any>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<PouchDB.Find.FindResponse<BookmarkDoc[]> | undefined> => {
        try {
            logger.debug("Start readBookmarkDocsInspectorTask", "Database", "Request");

            const response = this.readBookmarkDocs(BookmarkIndex, BookmarkQuery);

            logger.info("Successfully readBookmarkDocsInspectorTask", "Database", "Response");
            return response;
        } catch (error) {
            logger.error("Unable readBookmarkDocsInspectorTask", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
}
