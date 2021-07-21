import React, { useState, lazy, Suspense } from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { PatchCheck, InfoCircle, ExclamationDiamond, QuestionOctagon, CloudCheck, Share, Gear } from "react-bootstrap-icons";

import "../_locales/i18n";
import { useTranslation } from "react-i18next";

import NavBar from "../components/elements/NavBar";

import LoadingCard from "../components/elements/LoadingCard";

interface Props {
    type: string;
}

const Bookmarks_Container: React.FunctionComponent = (): React.ReactElement => {
    const { t } = useTranslation();
    const [navSelection, setNavSelection] = useState<string | null>("success");
    const handleSelectLink = (eventKey: string | null) => {
        setNavSelection(eventKey);
    };

    const BookmarkTable = (Props: Props) => {
        const BookmarkTable_Component = lazy(() => import("../components/bookmarks/bookmarkTable"));

        const type = Props.type;

        return <BookmarkTable_Component handleSetTableType={type} />;
    };

    return (
        <Container fluid className="content">
            <NavBar />
            <Row className="ps-3 pt-3">
                <Col>
                    <Card>
                        <Card.Header>
                            <Nav variant="tabs">
                                <Nav.Item>
                                    <Nav.Link onSelect={(eventKey) => handleSelectLink(eventKey)} eventKey="success" className="text-success">
                                        <PatchCheck /> {t("BookmarkSucces")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onSelect={(eventKey) => handleSelectLink(eventKey)} eventKey="info" className="text-info">
                                        <InfoCircle /> {t("BookmarkInfo")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onSelect={(eventKey) => handleSelectLink(eventKey)} eventKey="warning" className="text-warning">
                                        <ExclamationDiamond /> {t("BookmarkWarning")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onSelect={(eventKey) => handleSelectLink(eventKey)} eventKey="error" className="text-danger">
                                        <QuestionOctagon /> {t("BookmarkError")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onSelect={(eventKey) => handleSelectLink(eventKey)} eventKey="shared" className="text-light" disabled>
                                        <Share /> {t("BookmarkShared")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onSelect={(eventKey) => handleSelectLink(eventKey)} eventKey="global" className="text-light" disabled>
                                        <CloudCheck /> {t("BookmarkGlobal")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onSelect={(eventKey) => handleSelectLink(eventKey)} eventKey="options" className="text-dark">
                                        <Gear /> {t("BookmarkOptions")}
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Suspense fallback={<LoadingCard />}>{navSelection === "success" && <BookmarkTable type="success" />}</Suspense>
                            <Suspense fallback={<LoadingCard />}>{navSelection === "info" && <BookmarkTable type="info" />}</Suspense>
                            <Suspense fallback={<LoadingCard />}>{navSelection === "warning" && <BookmarkTable type="warning" />}</Suspense>
                            <Suspense fallback={<LoadingCard />}>{navSelection === "error" && <BookmarkTable type="error" />}</Suspense>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Bookmarks_Container;
