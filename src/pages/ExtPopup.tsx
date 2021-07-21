import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

import "../assets/styles/bootstrap.scss";

import { Logger } from "../modules/logs";
const logger = new Logger();

try {
    logger.debug("Start render Popup_Container", "FrontEnd", "Request");

    const App: React.FunctionComponent = () => {
        const Popup_Container = lazy(() => import("../container/Popup"));

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Popup_Container />
            </Suspense>
        );
    };

    ReactDOM.render(<App />, document.getElementById("index"));

    logger.info("Successfully render Popup_Container", "FrontEnd", "Response");
} catch (error) {
    logger.error("Unable render Popup_Container", "FrontEnd", "Error", error);
}
