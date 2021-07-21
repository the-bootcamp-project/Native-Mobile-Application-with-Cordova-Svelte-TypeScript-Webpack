import React from "react";
import { Container, Card } from "react-bootstrap";
import ReactJson from "react-json-view";

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

interface Props {
    error: (event: unknown) => void;
}

const ErrorCard: React.FunctionComponent<Props> = (Props): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <Container>
            <Card border="light">
                <Card.Header>{t("LoadingCardHeader")}</Card.Header>
                <Card.Body className="p-3 text-center">
                    <ReactJson src={Props.error} name={false} theme={"flat"} collapsed={false} enableClipboard={true} displayObjectSize={false} />
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ErrorCard;
