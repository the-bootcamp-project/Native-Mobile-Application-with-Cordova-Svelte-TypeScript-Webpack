import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

import "../assets/styles/bootstrap.scss";

import { Logger } from "../modules/logs";
const logger = new Logger();

try {
    logger.debug("Start render Dashboard_Container", "FrontEnd", "Request");

    const App: React.FunctionComponent = () => {
        const Dashboard_Container = lazy(() => import("../container/Dashboard"));

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Dashboard_Container />
            </Suspense>
        );
    };

    ReactDOM.render(<App />, document.getElementById("index"));

    logger.info("Successfully render Dashboard_Container", "FrontEnd", "Response");
} catch (error) {
    logger.error("Unable render Dashboard_Container", "FrontEnd", "Error", error);
}
