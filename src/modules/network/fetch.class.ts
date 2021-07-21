import fetch from "node-fetch";

import { DEF_APP_URL, DEF_DATABASE_NAME } from "../../constants";

interface httpHeader {
    name: string;
    value: string;
}

interface getResponse {
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    url: string;
    headers: httpHeader[];
    data: string;
}

interface error {
    error: true;
    msg: string;
}

const DEF_USERAGENT = `Mozilla/5.0 (compatible; ${DEF_DATABASE_NAME}/1.0; +${DEF_APP_URL}/bot.html)`;
// const BLOCK_SITES = ['*.mozilla.net', '*.mozilla.org', '*.mozilla.com', '*.firefox.com', '*.google.com']

export class HTTP {
    get = async (url: string): Promise<getResponse | error> => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                    "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
                    "Accept-Encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    "Upgrade-Insecure-Requests": "1",
                    // 'content-type': 'application/json',
                    // 'content-type': 'x-www-form-urlencoded',
                    "Content-Type": "text/html; charset=utf-8",
                    "Cache-Control": "max-age=0",
                    // origin: DEF_APP_URL,
                    "User-Agent": DEF_USERAGENT,
                },
            });

            const responseHeader: httpHeader[] = [];
            for (const header of response.headers) {
                responseHeader.push({ name: header[0].toLocaleLowerCase(), value: header[1] });
            }

            const result: getResponse = {
                ok: response.ok,
                redirected: response.redirected,
                status: response.status,
                statusText: response.statusText,
                url: response.url,
                headers: responseHeader,
                data: await response.text(),
            };

            return result;
        } catch (error) {
            const result: error = { error: true, msg: error };
            return result;
        }
    };
}
