// import { Bookmarks } from '../modules/browser'
// import { Metadata } from '../modules/crawler'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// onmessage = async (event: MessageEvent<any>): Promise<void> => {
//   const command = event.data

// if (command === 'crawler_start') {
//   const bookmarks = new Bookmarks()
//   const nextTarget = await bookmarks.readBookmarkDocsCrawlerTask()

//   if (nextTarget) {
//     const metadata = new Metadata()
//     const metadataResult = await metadata.getMetadata(nextTarget.docs[0].url)

//     // @ts-expect-error targetOrigin: string is unsupported
//     postMessage({ user: nextTarget.docs[0].createdBy, metadataResult })
//   } else {
//     // @ts-expect-error targetOrigin: string is unsupported
//     postMessage('crawler_done')
//   }
// }
// }

export {};
