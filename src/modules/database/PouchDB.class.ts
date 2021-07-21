import PouchDB from "pouchdb";
import PouchFind from "pouchdb-find";
PouchDB.plugin(PouchFind);

import { DEF_DATABASE_NAME } from "../../constants";
import { Logger } from "../logs";
const logger = new Logger();

export type localDBConfig = PouchDB.Configuration.LocalDatabaseConfiguration;
export type remoteDBConfig = PouchDB.Configuration.RemoteDatabaseConfiguration;
export type indexOptions = PouchDB.Find.CreateIndexOptions;
export type indexResponse = PouchDB.Find.CreateIndexResponse<PouchDB.Find.Index>;

type returnInfo = PouchDB.Core.DatabaseInfo;

export class Database {
    protected db: PouchDB.Database;

    constructor(name: string = DEF_DATABASE_NAME, options?: localDBConfig | remoteDBConfig) {
        this.db = new PouchDB(name, options);
    }
    /**
     * @returns Promise
     */
    readInfo = async (): Promise<returnInfo> => {
        try {
            logger.debug("Start readInfo", "Database", "Request");

            const response = await this.db.info();

            logger.info("Successfully readInfo", "Database", "Response");
            return response;
        } catch (error) {
            logger.error("Unable readInfo", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
    // NewDocument<Content extends {}>
    /**
     * @param  {indexOptions} index
     * @returns Promise
     */
    createIndex = async (index: indexOptions): Promise<indexResponse> => {
        try {
            logger.debug("Start createIndex", "Database", "Request");

            const response = await this.db.createIndex(index);

            logger.info("Successfully createIndex", "Database", "Response", response);
            return response;
        } catch (error) {
            logger.error("Unable createIndex", "Database", "Error", error);
            console.trace();
            return error;
        }
    };
}
