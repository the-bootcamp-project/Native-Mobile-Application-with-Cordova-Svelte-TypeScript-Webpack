import React from "react";
import { Card, Spinner } from "react-bootstrap";

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import PopupNavbar from "./PopupNavbar";

const PopupCard_Loading: React.FunctionComponent = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <Card>
            <Card.Header>
                <h3>{t("AppTitle")}</h3>
            </Card.Header>
            <Card.Text className="pt-3 text-warning">{t("LoadingCardHeader")}</Card.Text>
            <Card.Body className="text-wrap">
                <Spinner animation="border" />
            </Card.Body>
            <Card.Footer className="p-0">
                <PopupNavbar />
            </Card.Footer>
        </Card>
    );
};

export default PopupCard_Loading;
