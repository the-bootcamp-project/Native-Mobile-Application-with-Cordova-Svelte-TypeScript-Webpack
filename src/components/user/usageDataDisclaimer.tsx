import React, { useState, useEffect, lazy } from "react";
import { Card, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import { PatchExclamation, PatchQuestion, Download, Upload } from "react-bootstrap-icons";

import { Logger } from "../../modules/logs";
const logger = new Logger();

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import { UserData } from "../../modules/userdata";

interface Props {
    handleSetUsageData: (event: boolean) => void;
    handleSetWelcome: (event: boolean) => void;
}

const UsageDataDisclaimer: React.FunctionComponent<Props> = (Props): React.ReactElement => {
    const { t } = useTranslation();

    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    const [usageDataDisclaimer, setUsageDataDisclaimer] = useState<boolean>();
    const [welcome, setWelcome] = useState<boolean>(false);

    const updateUsageDataDisclaimer = async () => {
        try {
            logger.debug("Start handleSetUsageData", "FrontEnd", "Request");

            if (typeof usageDataDisclaimer === "boolean") {
                const user = new UserData();
                const response = await user.readUserData();

                if (response) {
                    response.disclaimer.usageDataShare = usageDataDisclaimer;
                    const responsePutUserData = await user.updateUserData(response);

                    logger.info("Successfully handleSetUsageData", "FrontEnd", "Response", responsePutUserData);
                    Props.handleSetUsageData(usageDataDisclaimer);
                }
            }
        } catch (error) {
            logger.error("Unable handleSetUsageData", "FrontEnd", "Error", error);
            setIsError(true);
            setError(error);
        }
    };

    const updateWelcomeAchievment = async () => {
        try {
            logger.debug("Start handleSetWelcome", "FrontEnd", "Request");

            if (typeof welcome === "boolean") {
                const user = new UserData();
                const response = await user.readUserData();

                if (response) {
                    response.achievements.welcome = welcome;
                    const resultPutUserData = await user.updateUserData(response);

                    logger.info("Successfully handleSetWelcome", "FrontEnd", "Response", resultPutUserData);
                    Props.handleSetWelcome(welcome);
                }
            }
        } catch (error) {
            logger.error("Unable handleSetWelcome", "FrontEnd", "Error", error);
            setIsError(true);
            setError(error);
        }
    };

    useEffect(() => {
        updateUsageDataDisclaimer();
    }, [usageDataDisclaimer]);

    useEffect(() => {
        updateWelcomeAchievment();
    }, [welcome]);

    if (isError) {
        const ErrorCard = lazy(() => import("../../components/elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }
    return (
        <div>
            <Card>
                <Card.Header>
                    <h3 className="mb-0">{t("UsageDataHeadline")}</h3>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{t("UsageDataDescription")}</Card.Text>
                    <p>
                        <small>{t("UsageDataShortDisclaimer")}</small>
                    </p>
                    <Row>
                        <Col>
                            <ListGroup variant="flush">
                                <ListGroup.Item variant="primary">
                                    <Download /> {t("UsageDataRequired")} <PatchExclamation />
                                </ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check checked disabled type="checkbox" id="Required" label={t("UsageDataJustificationRequired")} />
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col>
                            <ListGroup variant="flush">
                                <ListGroup.Item variant="secondary">
                                    <Upload /> {t("UsageDataOptional")} <PatchQuestion />
                                </ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check onChange={() => setUsageDataDisclaimer(!usageDataDisclaimer)} type="checkbox" id="Optional" label={t("UsageDataJustificationOptional")} />
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pt-3 text-center">
                            <Button onClick={() => setWelcome(!welcome)} variant="success">
                                {t("ActionButtonNext")}
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default UsageDataDisclaimer;
