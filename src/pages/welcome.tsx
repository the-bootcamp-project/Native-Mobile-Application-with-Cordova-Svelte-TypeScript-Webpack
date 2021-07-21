import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

import "../assets/styles/bootstrap.scss";

import { Logger } from "../modules/logs";
const logger = new Logger();

try {
    logger.debug("Start render Welcome_Container", "FrontEnd", "Request");

    const App: React.FunctionComponent = () => {
        const Welcome_Container = lazy(() => import("../container/Welcome"));

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Welcome_Container />
            </Suspense>
        );
    };

    ReactDOM.render(<App />, document.getElementById("index"));

    logger.info("Successfully render Welcome_Container", "FrontEnd", "Response");
} catch (error) {
    logger.error("Unable render Welcome_Container", "FrontEnd", "Error", error);
}
