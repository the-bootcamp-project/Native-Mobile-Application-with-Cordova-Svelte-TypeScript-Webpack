import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

import "../assets/styles/bootstrap.scss";

import { Logger } from "../modules/logs";
const logger = new Logger();

try {
    logger.debug("Start render Bookmarks_Container", "FrontEnd", "Request");

    const App: React.FunctionComponent = () => {
        const Bookmarks_Container = lazy(() => import("../container/Bookmarks"));

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Bookmarks_Container />
            </Suspense>
        );
    };

    ReactDOM.render(<App />, document.getElementById("index"));

    logger.info("Successfully render Bookmarks_Container", "FrontEnd", "Response");
} catch (error) {
    logger.error("Unable render Bookmarks_Container", "FrontEnd", "Error", error);
}
