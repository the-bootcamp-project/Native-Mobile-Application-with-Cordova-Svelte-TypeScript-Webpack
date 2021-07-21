import React, { useState, useEffect, lazy } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { BookmarkStar, ShieldLock, ShieldCheck, CloudUpload, ArrowClockwise, Gear, CheckCircle } from "react-bootstrap-icons";

import "../_locales/i18n";
import { useTranslation } from "react-i18next";

import { Bookmarks, BookmarkDoc } from "../modules/browser";
import { Parser } from "../modules/crawler";

import NavBar from "../components/elements/NavBar";

const DocumentView_Container: React.FunctionComponent = (): React.ReactElement => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    const [documentID, setDocumentID] = useState<string>();
    const [bookmark, setBookmark] = useState<BookmarkDoc>();
    const [crawlerTask, setCrawlerTask] = useState<boolean>(false);

    const readBookmarkDoc = async (docID: string): Promise<void> => {
        const bookmarks = new Bookmarks();
        const response = await bookmarks.readBookmarkDocByID(docID);

        setBookmark(response);
    };

    const updateCrawlerTask = async (): Promise<void> => {
        const bookmarks = new Bookmarks();
        if (bookmark) {
            bookmark.tasks.requested = true;

            const response = await bookmarks.updateBookmarkDoc(bookmark);
            if (response.ok) {
                setCrawlerTask(true);
            }
        }
    };

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        try {
            const params = new URLSearchParams(document.location.search.substring(1));
            const documentID = params.get("id");
            if (documentID) {
                setDocumentID(documentID);
            }
        } catch (error) {
            setError(error);
            setIsError(true);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        try {
            if (documentID) {
                readBookmarkDoc(documentID);
            }
        } catch (error) {
            setError(error);
            setIsError(true);
        }
        setIsLoading(false);
    }, [documentID]);

    if (isError) {
        const ErrorCard = lazy(() => import("../components/elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }

    return (
        <Container fluid className="content">
            <NavBar />
            <Row className="ps-3 pt-3">
                <Col lg="10">
                    <Card>
                        <Card.Header>
                            <BookmarkStar /> {bookmark?.title}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                {bookmark?.title}
                                {bookmark?.visibility === "private" && <ShieldLock />}
                                {bookmark?.visibility === "protected" && <ShieldCheck />}
                                {bookmark?.visibility === "public" && <CloudUpload />}
                            </Card.Title>
                            <Card.Text></Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">2 days ago</Card.Footer>
                    </Card>
                </Col>
                <Col lg="2">
                    <Card>
                        <Card.Header>
                            <Gear /> {t("ActionsSelection")}
                        </Card.Header>
                        <Card.Body className="p-0">
                            <ListGroup variant="flush">
                                <ListGroup.Item onClick={() => updateCrawlerTask()}>
                                    {crawlerTask || bookmark?.tasks.requested ? <CheckCircle /> : <ArrowClockwise />} {t("CrawlerStartTaskButton")}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DocumentView_Container;
