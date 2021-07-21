import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

import "../assets/styles/bootstrap.scss";

import { Logger } from "../modules/logs";
const logger = new Logger();

try {
    logger.debug("Start render Error_Container", "FrontEnd", "Request");

    const App: React.FunctionComponent = () => {
        const Error_Container = lazy(() => import("../container/Error"));

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Error_Container />
            </Suspense>
        );
    };

    ReactDOM.render(<App />, document.getElementById("index"));

    logger.info("Successfully render Error_Container", "FrontEnd", "Response");
} catch (error) {
    logger.error("Unable render Error_Container", "FrontEnd", "Error", error);
}
