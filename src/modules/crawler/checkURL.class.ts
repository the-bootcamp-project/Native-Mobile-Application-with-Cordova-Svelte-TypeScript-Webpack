import { Metadata } from "./";
import { HeaderChecker } from "./";

export class URLChecker {
    /**
     * @param  {string} url
     * @returns Promise
     */
    isValidURL = async (url: string): Promise<boolean> => {
        const result = url.match(/^http(s)?/gi);

        if (result !== null) {
            return true;
        } else {
            return false;
        }
    };
    /**
     * @param  {string} url
     * @returns Promise
     */
    hasCSP = async (url: string): Promise<boolean> => {
        const metadata = new Metadata();
        const cspMeta = await metadata.getCSPTag(url);

        const header = new HeaderChecker();
        const cspHeader = await header.getCSPTag(url);

        console.log(cspHeader);

        if (cspMeta || cspHeader) {
            return true;
        } else {
            return false;
        }
    };
}
