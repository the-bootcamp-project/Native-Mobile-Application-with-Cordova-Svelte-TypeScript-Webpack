import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

import { Logger } from "../logs";
const logger = new Logger();

export class HTTP {
    private client: AxiosInstance;
    /**
     * @param  {} timeout=10000
     * @param  {string} timeoutErrorMessage?
     */
    constructor(timeout = 10000, timeoutErrorMessage?: string) {
        this.client = axios.create({
            timeout,
            timeoutErrorMessage,
            responseType: "json",
        });
    }
    /**
     * @param  {string} url
     * @param  {AxiosRequestConfig} config?
     * @returns Promise
     */
    get = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<AxiosResponse | AxiosError>> => {
        try {
            logger.debug("Start get Response", "Network", "Request");

            const response = await this.client.get(url, config);

            logger.info("Successfully get Response", "Network", "Response");
            return response;
        } catch (error) {
            logger.error("Unable get Response", "Network", "Error", error);
            console.trace();
            return error;
        }
    };
    /**
     * @param  {string} url
     * @param  {AxiosRequestConfig} config?
     * @returns Promise
     */
    head = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<AxiosResponse | AxiosError>> => {
        try {
            logger.debug("Start get Response", "Network", "Request");

            const response = await this.client.head(url, config);

            logger.info("Successfully get Response", "Network", "Response");
            return response;
        } catch (error) {
            logger.error("Unable get Response", "Network", "Error", error);
            console.trace();
            return error;
        }
    };
}
