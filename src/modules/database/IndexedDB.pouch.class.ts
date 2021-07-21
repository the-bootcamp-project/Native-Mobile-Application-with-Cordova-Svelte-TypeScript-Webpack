import PouchDB from "pouchdb";
import PouchFind from "pouchdb-find";
PouchDB.plugin(PouchFind);

import { Database, localDBConfig, remoteDBConfig } from "./PouchDB.class";

import { DEF_DATABASE_NAME } from "../../constants";
import { Logger } from "../logs";
const logger = new Logger();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type putDocument = PouchDB.Core.PutDocument<any>;
type putOptions = PouchDB.Core.PutOptions;

export type returnResponse = PouchDB.Core.Response;

export type getOptions = PouchDB.Core.GetOptions;
type returnDocument = PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type findRequest = PouchDB.Find.FindRequest<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type findResponse = PouchDB.Find.FindResponse<any>;

type removeDocument = PouchDB.Core.RemoveDocument;

type allDocsOptions = PouchDB.Core.AllDocsWithKeyOptions | PouchDB.Core.AllDocsOptions | PouchDB.Core.AllDocsWithKeysOptions | PouchDB.Core.AllDocsWithinRangeOptions | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type allDOcsResponse = PouchDB.Core.AllDocsResponse<any>;

export class IndexedDB extends Database {
    constructor(name: string = DEF_DATABASE_NAME, options?: localDBConfig | remoteDBConfig) {
        super();

        const config = options ? options : {};

        config.adapter = "idb";

        this.db = new PouchDB(name, options);
    }

    create = async (doc: putDocument, options: putOptions = {}): Promise<returnResponse> => {
        try {
            logger.debug("Start create Documents", "Database", "Request");

            const response = await this.db.put(doc, options);

            logger.info("Successfully create Documents", "Database", "Response", response);
            return response;
        } catch (error) {
            logger.error("Unable create Documents", "Database", "Error", error);
            console.trace();
            return error;
        }
    };

    // TODO Type?
    /**
     * @param  {string} docID
     * @param  {getOptions={}} options
     * @returns Promise
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    read = async (docID: string, options: getOptions = {}): Promise<returnDocument | any> => {
        try {
            logger.debug("Start read Documents", "Database", "Request");

            const response = await this.db.get(docID, options);

            logger.info("Successfully read Documents", "Database", "Response");
            return response;
        } catch (error) {
            logger.error("Unable read Documents", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {findRequest} request
     * @returns Promise
     */
    find = async (request: findRequest): Promise<findResponse> => {
        try {
            logger.debug("Start find Documents", "Database", "Request");

            const response = await this.db.find(request);

            logger.info("Successfully find Documents", "Database", "Response");
            return response;
        } catch (error) {
            logger.error("Unable find Documents", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {putDocument} doc
     * @param  {putOptions={}} options
     * @returns Promise
     */
    update = async (doc: putDocument, options: putOptions = {}): Promise<returnResponse> => {
        try {
            logger.debug("Start update Documents", "Database", "Request");

            const response = await this.db.put(doc, options);

            logger.info("Successfully update Documents", "Database", "Response", response);
            return response;
        } catch (error) {
            logger.error("Unable update Documents", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {removeDocument} doc
     * @returns Promise
     */
    delete = async (doc: removeDocument): Promise<returnResponse> => {
        try {
            logger.debug("Start remove Documents", "Database", "Request");

            const response = await this.db.remove(doc);

            logger.info("Successfully remove Documents", "Database", "Response", response);
            return response;
        } catch (error) {
            logger.error("Unable remove Documents", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {allDocsOptions} options?
     * @returns Promise
     */
    dump = async (options?: allDocsOptions): Promise<allDOcsResponse> => {
        try {
            const request = options ? options : {};

            request.include_docs = true;
            request.attachments = true;
            request.conflicts = true;

            logger.debug("Start dump Documents", "Database", "Request", request);

            const response = await this.db.allDocs(request);

            logger.info("Successfully dump Documents", "Database", "Response");
            return response;
        } catch (error) {
            logger.error("Unable dump Documents", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
}
