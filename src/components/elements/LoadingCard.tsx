import React from "react";
import { Container, Card, Spinner } from "react-bootstrap";

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

const LoadingCard: React.FunctionComponent = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <Container>
            <Card border="light">
                <Card.Header>{t("LoadingCardHeader")}</Card.Header>
                <Card.Body className="p-3 text-center">
                    <Spinner as="span" animation="border" role="status" aria-hidden="true" />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoadingCard;
