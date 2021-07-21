import cheerio from "cheerio";

import { Logger } from "../logs";
import { HTTP } from "../network";
const logger = new Logger();

interface HTTPResponse extends HTTPResponseData, HTTPResponseHeaders {
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    url: string;
}
interface HTTPResponseData {
    data: string;
}
interface HTTPResponseHeaders {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers: any;
}

interface HTMLTag {
    attributes: any;
    text?: string;
    name: any;
    type: any;
}

export interface MetaData {
    status?: number;
    statusText?: string;
    redirected?: boolean;
    url?: string;
    headers?: HTTPResponseHeaders;
    metaTags?: HTMLTag[];
    linkTags?: HTMLTag[];
    scriptTags?: HTMLTag[];
    hyperlinks?: HTMLTag[];
    h1?: HTMLTag[];
    h2?: HTMLTag[];
    h3?: HTMLTag[];
    h4?: HTMLTag[];
    h5?: HTMLTag[];
    h6?: HTMLTag[];
}

export class Parser {
    /**
     * @param  {string} url
     * @returns Promise
     */
    readHTTP = async (url: string): Promise<HTTPResponse | undefined> => {
        try {
            logger.debug("Start getHTTP", "System", "Request");

            const request = new HTTP();
            const response = await request.get(url);
            logger.info("Successfully getHTTP", "System", "Response");

            return response;
        } catch (error) {
            logger.error("Unable getHTTP", "System", "Error", error);
            console.trace();
        }
    };
    /**
     * @param  {string} url
     * @returns Promise
     */
    readHTMLTag = async (data: string): Promise<HTMLTag | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const htmlTag: HTMLTag = {
                    attributes: $("html").get(0).attribs,
                    name: $("html").get(0).name,
                    type: $("body").get(0).type,
                };

                logger.info("Successfully getMetadata", "System", "Response");
                return htmlTag;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readBodyTag = async (data: string): Promise<HTMLTag | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const bodyTag: HTMLTag = {
                    attributes: $("body").get(0).attribs,
                    name: $("body").get(0).name,
                    type: $("body").get(0).type,
                };

                logger.info("Successfully getMetadata", "System", "Response");
                return bodyTag;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readMetaTags = async (data: string): Promise<HTMLTag[] | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const metaTags: HTMLTag[] = $("meta")
                    .get()
                    .map((x) => {
                        return {
                            attributes: $(x).get(0).attribs,
                            name: $(x).get(0).name,
                            type: $(x).get(0).type,
                        };
                    });

                logger.info("Successfully getMetadata", "System", "Response");
                return metaTags;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readLinkTags = async (data: string): Promise<HTMLTag[] | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const linkTags: HTMLTag[] = $("link")
                    .get()
                    .map((x) => {
                        return {
                            attributes: $(x).get(0).attribs,
                            name: $(x).get(0).name,
                            type: $(x).get(0).type,
                        };
                    });

                logger.info("Successfully getMetadata", "System", "Response");
                return linkTags;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readScriptTags = async (data: string): Promise<HTMLTag[] | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const scriptTags: HTMLTag[] = $("script")
                    .get()
                    .map((x) => {
                        return {
                            attributes: $(x).get(0).attribs,
                            name: $(x).get(0).name,
                            type: $(x).get(0).type,
                        };
                    });

                logger.info("Successfully getMetadata", "System", "Response");
                return scriptTags;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readHyperlinks = async (data: string): Promise<HTMLTag[] | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const hyperlinks: HTMLTag[] = $("a")
                    .get()
                    .map((x) => {
                        return {
                            attributes: $(x).get(0).attribs,
                            text: $(x).text(),
                            name: $(x).get(0).name,
                            type: $(x).get(0).type,
                        };
                    });

                logger.info("Successfully getMetadata", "System", "Response");
                return hyperlinks;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readHeadline1 = async (data: string): Promise<HTMLTag[] | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const hyperlinks: HTMLTag[] = $("h1")
                    .get()
                    .map((x) => {
                        return {
                            attributes: $(x).get(0).attribs,
                            text: $(x).text(),
                            name: $(x).get(0).name,
                            type: $(x).get(0).type,
                        };
                    });

                logger.info("Successfully getMetadata", "System", "Response");
                return hyperlinks;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readHeadline2 = async (data: string): Promise<HTMLTag[] | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const hyperlinks: HTMLTag[] = $("h2")
                    .get()
                    .map((x) => {
                        return {
                            attributes: $(x).get(0).attribs,
                            text: $(x).text(),
                            name: $(x).get(0).name,
                            type: $(x).get(0).type,
                        };
                    });

                logger.info("Successfully getMetadata", "System", "Response");
                return hyperlinks;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readHeadline3 = async (data: string): Promise<HTMLTag[] | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const hyperlinks: HTMLTag[] = $("h3")
                    .get()
                    .map((x) => {
                        return {
                            attributes: $(x).get(0).attribs,
                            text: $(x).text(),
                            name: $(x).get(0).name,
                            type: $(x).get(0).type,
                        };
                    });

                logger.info("Successfully getMetadata", "System", "Response");
                return hyperlinks;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readHeadline4 = async (data: string): Promise<HTMLTag[] | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const hyperlinks: HTMLTag[] = $("h4")
                    .get()
                    .map((x) => {
                        return {
                            attributes: $(x).get(0).attribs,
                            text: $(x).text(),
                            name: $(x).get(0).name,
                            type: $(x).get(0).type,
                        };
                    });

                logger.info("Successfully getMetadata", "System", "Response");
                return hyperlinks;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readHeadline5 = async (data: string): Promise<HTMLTag[] | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const hyperlinks: HTMLTag[] = $("h5")
                    .get()
                    .map((x) => {
                        return {
                            attributes: $(x).get(0).attribs,
                            text: $(x).text(),
                            name: $(x).get(0).name,
                            type: $(x).get(0).type,
                        };
                    });

                logger.info("Successfully getMetadata", "System", "Response");
                return hyperlinks;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @returns Promise
     */
    readHeadline6 = async (data: string): Promise<HTMLTag[] | undefined> => {
        try {
            logger.debug("Start getMetadata", "System", "Request");

            if (data) {
                const $ = cheerio.load(data);

                const hyperlinks: HTMLTag[] = $("h6")
                    .get()
                    .map((x) => {
                        return {
                            attributes: $(x).get(0).attribs,
                            text: $(x).text(),
                            name: $(x).get(0).name,
                            type: $(x).get(0).type,
                        };
                    });

                logger.info("Successfully getMetadata", "System", "Response");
                return hyperlinks;
            }
        } catch (error) {
            logger.error("Unable getMetadata", "System", "Error", error);
            console.trace();
            return error;
        }
    };

    // /**
    //  * @param  {string} url
    //  * @returns Promise
    //  */
    // getCSPTag = async (url: string): Promise<string | undefined> => {
    //   const parse = new Parser()
    //   const http = await parse.getHTTP(url)

    //   if (http) {
    //     if (http.data) {
    //       const $ = cheerio.load(http.data)
    //       const result = $('meta[http-equiv=Content-Security-Policy]').attr('content')

    //       return result
    //     }
    //   }
    // }
}
