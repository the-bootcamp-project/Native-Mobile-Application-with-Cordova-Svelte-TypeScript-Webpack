import { Database } from "../modules/database";
(async () => {
    try {
        const db = new Database();
        const info = await db.readInfo();

        if (typeof info.db_name) {
            if (window.Worker) {
                const Crawler = new Worker("crawler_worker.js");

                Crawler.postMessage("crawler_start");

                Crawler.onmessage = (event) => {
                    try {
                        const result = event.data;

                        console.log(result);

                        if (result === "crawler_done") {
                            const Crawler = new Worker("crawler_worker.js");
                            Crawler.postMessage("crawler_start");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };
            }
        }
    } catch (error) {
        console.log(error);
    }
})();
