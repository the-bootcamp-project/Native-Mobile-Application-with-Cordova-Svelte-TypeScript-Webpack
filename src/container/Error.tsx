import React, { useState, useEffect, lazy } from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";
import { EmojiDizzy } from "react-bootstrap-icons";

import { Logger } from "../modules/logs";
const logger = new Logger();

import "../_locales/i18n";
import { useTranslation } from "react-i18next";

import LoadingCard from "../components/elements/LoadingCard";

const Error_Container: React.FunctionComponent = (): React.ReactElement => {
    const { t } = useTranslation();

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
        <Container>
            <Jumbotron className="text-center">
                <h1>{t("ErrorHeaderHeadline")}</h1>
                <p>
                    <EmojiDizzy width="128" height="128" />
                </p>
                <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
        </Container>
    );
};

export default Error_Container;
