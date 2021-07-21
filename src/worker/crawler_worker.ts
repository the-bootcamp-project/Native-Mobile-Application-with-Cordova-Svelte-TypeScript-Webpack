import { Bookmarks } from "../modules/browser";
import { Parser, MetaData } from "../modules/crawler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
onmessage = async (event: MessageEvent<any>): Promise<void> => {
    const command = event.data;

    if (command === "crawler_start") {
        const bookmarks = new Bookmarks();
        const nextTask = await bookmarks.readCrawlerTask();

        if (nextTask) {
            const bookmark = nextTask.docs[0];

            const crawl = new Parser();
            const responseHTTP = await crawl.readHTTP(bookmark.url);

            if (responseHTTP?.ok) {
                const result: MetaData = {
                    status: responseHTTP.status,
                    statusText: responseHTTP.statusText,
                    redirected: responseHTTP.redirected,
                    url: responseHTTP.url,
                    headers: responseHTTP.headers,
                    metaTags: await crawl.readMetaTags(responseHTTP.data),
                    linkTags: await crawl.readLinkTags(responseHTTP.data),
                    scriptTags: await crawl.readScriptTags(responseHTTP.data),
                    hyperlinks: await crawl.readHyperlinks(responseHTTP.data),
                    h1: await crawl.readHeadline1(responseHTTP.data),
                    h2: await crawl.readHeadline2(responseHTTP.data),
                    h3: await crawl.readHeadline3(responseHTTP.data),
                    h4: await crawl.readHeadline4(responseHTTP.data),
                    h5: await crawl.readHeadline5(responseHTTP.data),
                    h6: await crawl.readHeadline6(responseHTTP.data),
                };

                bookmark.metaData = result;
                bookmark.tasks.requested = false;
                const response = await bookmarks.updateBookmarkDoc(bookmark);

                // @ts-expect-error targetOrigin: string is unsupported
                postMessage(response);
                // @ts-expect-error targetOrigin: string is unsupported
                postMessage("crawler_done");
            } else {
                // @ts-expect-error targetOrigin: string is unsupported
                postMessage(responseHTTP);
            }
        } else {
            // @ts-expect-error targetOrigin: string is unsupported
            postMessage("crawler_done");
        }
    }
};
