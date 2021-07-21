import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

import "../assets/styles/bootstrap.scss";

import { Logger } from "../modules/logs";
const logger = new Logger();

try {
    logger.debug("Start render DevTools_Container", "FrontEnd", "Request");

    const App: React.FunctionComponent = () => {
        const DevTools_Container = lazy(() => import("../container/DevTools"));

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <DevTools_Container />
            </Suspense>
        );
    };

    ReactDOM.render(<App />, document.getElementById("index"));

    logger.info("Successfully render DevTools_Container", "FrontEnd", "Response");
} catch (error) {
    logger.error("Unable render DevTools_Container", "FrontEnd", "Error", error);
}
