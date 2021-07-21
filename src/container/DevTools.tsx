import React, { useState, useEffect, lazy } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Logger } from "../modules/logs";
const logger = new Logger();

import LoadingCard from "../components/elements/LoadingCard";

const DevTools_Container: React.FunctionComponent = (): React.ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    useEffect(() => {
        (async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                //
            } catch (error) {
                logger.error("Unable ", "FrontEnd", "Error", error);

                setError(error);
                setIsError(true);
            }
            setIsLoading(false);
        })();
    }, []);

    if (isError) {
        const ErrorCard = lazy(() => import("../components/elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }
    if (isLoading) {
        return <LoadingCard />;
    }

    return (
        <Container fluid className="content">
            <Row>
                <Col>
                    <p>DevTools</p>
                </Col>
            </Row>
        </Container>
    );
};

export default DevTools_Container;
