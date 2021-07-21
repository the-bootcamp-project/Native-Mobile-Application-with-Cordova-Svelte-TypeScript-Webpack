import React, { useState, useEffect, lazy } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import ReactJson from "react-json-view";

import { Logger } from "../../modules/logs";
const logger = new Logger();

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import { IUserData } from "../../modules/userdata";

import LoadingCard from "../../components/elements/LoadingCard";

interface Props {
    userData: IUserData;
}

const ShowUserData: React.FunctionComponent<Props> = (Props): React.ReactElement => {
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
                setIsError(true);
                setError(error);
            }
            setIsLoading(false);
        })();
    }, []);

    if (isError) {
        const ErrorCard = lazy(() => import("../../components/elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }
    if (isLoading) {
        return <LoadingCard />;
    }

    return (
        <Accordion>
            <Card>
                <Card.Header className="text-right">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <h4 className="mb-0">{t("UsageDataPreview")}</h4>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="p-0">
                        <ReactJson src={Props.userData} name={false} theme={"flat"} collapsed={false} enableClipboard={true} displayObjectSize={false} />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default ShowUserData;
