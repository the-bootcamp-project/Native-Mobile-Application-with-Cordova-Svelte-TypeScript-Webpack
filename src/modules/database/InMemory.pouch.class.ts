// import PouchDB from 'pouchdb'
// import PouchFind from 'pouchdb-find'
// import memory from 'pouchdb-adapter-memory'
// PouchDB.plugin(PouchFind)
// PouchDB.plugin(memory)

// import { Database, IdMeta, GetMeta, IDatabaseConfig } from './PouchDB.class'

// import { DEF_DATABASE_NAME } from '../../constants'
// import { Logger } from '../logs'
// const logger = new Logger()

// export class InMemory extends Database {
//   constructor(name: string = DEF_DATABASE_NAME, options?: IDatabaseConfig) {
//     super()

//     const config = options ? options : {}

//     config.adapter = 'memory'

//     this.db = new PouchDB(name, config)
//   }

//   // TODO Type?
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   get = async (docID: string, options: PouchDB.Core.GetOptions = {}): Promise<(IdMeta & GetMeta) | any | undefined> => {
//     try {
//       logger.debug('Start get Documents', 'Database', 'Request')

//       const response = await this.db.get(docID, options)

//       logger.info('Successfully get Documents', 'Database', 'Response')
//       return response
//     } catch (error) {
//       logger.error('Unable get Documents', 'Database', 'Error', error)
//       console.trace()
//     }
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   find = async (request: PouchDB.Find.FindRequest<any>): Promise<PouchDB.Find.FindResponse<any> | undefined> => {
//     try {
//       logger.debug('Start find Documents', 'Database', 'Request')

//       const response = await this.db.find(request)

//       logger.info('Successfully find Documents', 'Database', 'Response')
//       return response
//     } catch (error) {
//       logger.error('Unable find Documents', 'Database', 'Error', error)
//       console.trace()
//     }
//   }

//   put = async (
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     doc: PouchDB.Core.PutDocument<any & string>,
//     options: PouchDB.Core.PutOptions = {},
//   ): Promise<PouchDB.Core.Response | undefined> => {
//     try {
//       logger.debug('Start put Documents', 'Database', 'Request', options)

//       const response = await this.db.put(doc, options)

//       logger.info('Successfully put Documents', 'Database', 'Response', response)
//       return response
//     } catch (error) {
//       logger.error('Unable put Documents', 'Database', 'Error', error)
//       console.trace()
//     }
//   }

//   dump = async (
//     options?:
//       | PouchDB.Core.AllDocsWithKeyOptions
//       | PouchDB.Core.AllDocsOptions
//       | PouchDB.Core.AllDocsWithKeysOptions
//       | PouchDB.Core.AllDocsWithinRangeOptions
//       | undefined,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   ): Promise<any> => {
//     try {
//       const request = options ? options : {}

//       request.include_docs = true
//       request.attachments = true
//       request.conflicts = true

//       logger.debug('Start dump Documents', 'Database', 'Request', request)

//       const response = await this.db.allDocs(request)

//       logger.info('Successfully dump Documents', 'Database', 'Response')
//       return response
//     } catch (error) {
//       logger.error('Unable dump Documents', 'Database', 'Error', error)
//       console.trace()
//     }
//   }
// }

export {};
