import React from "react";
import { Card } from "react-bootstrap";

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

interface Props {
    handleUserDataDone: (event: boolean) => void;
}

const RestoreBackup: React.FunctionComponent<Props> = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <Card>
            <Card.Header>
                <h3 className="mb-0">{t("WelcomeNewUserOrStartRestor")}</h3>
            </Card.Header>
            <Card.Body>
                <Card.Text>{t("WelcomeNewUserOrRestor")}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default RestoreBackup;
