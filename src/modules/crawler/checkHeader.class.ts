import { Parser } from "./";

export class HeaderChecker {
    /**
     * @param  {string} url
     * @returns Promise
     */
    getCSPTag = async (url: string): Promise<string | undefined> => {
        const parse = new Parser();
        const http = await parse.getHTTP(url);

        if (http) {
            if (http.headers) {
                return http.headers;
            }
        }
    };
}
