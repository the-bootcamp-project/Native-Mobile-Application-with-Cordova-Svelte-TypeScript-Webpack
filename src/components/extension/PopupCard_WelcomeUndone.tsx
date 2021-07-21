import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { ExclamationOctagon } from "react-bootstrap-icons";

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import { Tabs } from "../../modules/browser";

import PopupNavbar from "./PopupNavbar";

const PopupCard_WelcomeUndone: React.FunctionComponent = (): React.ReactElement => {
    const { t } = useTranslation();

    const openWelcomepage = async () => {
        const tabs = new Tabs();
        await tabs.create("welcome.html");
    };

    return (
        <Card>
            <Card.Header>
                <h3>{t("AppTitle")}</h3>
            </Card.Header>
            <Card.Text className="pt-3 text-warning">
                <ExclamationOctagon width="128" height="128" />
            </Card.Text>
            <Card.Body className="text-wrap">
                <Row>
                    <Col>
                        {t("PopupWelcomSettingsUndoneShort")}
                        <br />
                        <br />
                        {t("PopupWelcomSettingsUndoneLong")}
                    </Col>
                </Row>
                <Row>
                    <Col className="pt-3">
                        <Button variant="primary" className="text-light" onClick={() => openWelcomepage()}>
                            {t("PopupWelcomSettingsUndoneLink")}
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className="p-0">
                <PopupNavbar />
            </Card.Footer>
        </Card>
    );
};

export default PopupCard_WelcomeUndone;
