import React, { useState, useEffect, lazy, Suspense } from "react";
import { Container, Row, Col, CardDeck } from "react-bootstrap";

import { Logger } from "../modules/logs";
const logger = new Logger();

import NavBar from "../components/elements/NavBar";

import LoadingCard from "../components/elements/LoadingCard";

interface Props {
    type: string;
}

const Dashboard_Container: React.FunctionComponent = (): React.ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    useEffect(() => {
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
    }, []);

    if (isError) {
        const ErrorCard = lazy(() => import("../components/elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }
    if (isLoading) {
        return <LoadingCard />;
    }

    const BookmarkWidget = (Props: Props) => {
        const BookmarkWidget_Component = lazy(() => import("../components/bookmarks/bookmarkWidget"));

        const type = Props.type;

        return <BookmarkWidget_Component handleSetTableType={type} />;
    };

    return (
        <Container fluid className="content">
            <NavBar />
            <Row className="ps-3 pt-3">
                <Col>
                    <CardDeck>
                        <Suspense fallback={<LoadingCard />}>
                            <BookmarkWidget type="success" />
                        </Suspense>
                        <Suspense fallback={<LoadingCard />}>
                            <BookmarkWidget type="info" />
                        </Suspense>
                        <Suspense fallback={<LoadingCard />}>
                            <BookmarkWidget type="warning" />
                        </Suspense>
                        <Suspense fallback={<LoadingCard />}>
                            <BookmarkWidget type="error" />
                        </Suspense>
                    </CardDeck>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard_Container;
