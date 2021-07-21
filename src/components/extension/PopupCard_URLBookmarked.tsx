import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { ExclamationOctagon } from "react-bootstrap-icons";
import ReactJson from "react-json-view";

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import { tabType } from "../../modules/browser";

import PopupNavbar from "./PopupNavbar";

interface Props {
    tabData: tabType;
}

const PopupCard_URLBookmarked: React.FunctionComponent<Props> = (Props): React.ReactElement => {
    const { t } = useTranslation();

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
                    <Col>{typeof Props.tabData === "object" && <ReactJson src={Props.tabData} name={false} theme={"flat"} collapsed={false} enableClipboard={true} displayObjectSize={false} />}</Col>
                </Row>
            </Card.Body>
            <Card.Footer className="p-0">
                <PopupNavbar />
            </Card.Footer>
        </Card>
    );
};

export default PopupCard_URLBookmarked;
