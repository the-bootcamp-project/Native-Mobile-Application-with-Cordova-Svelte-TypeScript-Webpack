import React, { useState } from "react";
import { Alert, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import PopupNavbar from "./PopupNavbar";

const PopupCard_URLUnkown: React.FunctionComponent = (): React.ReactElement => {
    const { t } = useTranslation();

    const [unkownTab, setUnknownTab] = useState<boolean>(true);

    return (
        <Card>
            <Card.Header>
                <h3>{t("AppTitle")}</h3>
            </Card.Header>
            <Card.Body className="text-wrap">
                <Row>
                    <Col>
                        <Alert show={unkownTab} variant="info">
                            <p>{t("PopupUnknownTabNotification")}</p>
                            <ButtonGroup>
                                <Button variant="info" size="sm" onClick={() => setUnknownTab(false)}>
                                    {t("PopupUnknownTabNotificationDisplayURL")}
                                </Button>
                                <Button variant="outline-info" size="sm" onClick={() => setUnknownTab(false)}>
                                    {t("PopupUnknownTabNotificationDisplayGenerall")}
                                </Button>
                            </ButtonGroup>
                        </Alert>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className="p-0">
                <PopupNavbar />
            </Card.Footer>
        </Card>
    );
};

export default PopupCard_URLUnkown;
