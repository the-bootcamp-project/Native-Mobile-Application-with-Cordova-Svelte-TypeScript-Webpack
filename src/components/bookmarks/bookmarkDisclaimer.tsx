import React, { useState, useEffect, lazy } from "react";
import { Container, Card, Row, Col, ButtonGroup, Button, Spinner } from "react-bootstrap";
import { BookmarkPlus, BookmarkPlusFill } from "react-bootstrap-icons";

import { Logger } from "../../modules/logs";
const logger = new Logger();

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import { UserData } from "../../modules/userdata";
import { Bookmarks } from "../../modules/browser";

interface Props {
    handleSetBookmarkedDone: (event: boolean) => void;
}

const bookmarkDisclaimer: React.FunctionComponent<Props> = (Props): React.ReactElement => {
    const { t } = useTranslation();

    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    const [bookmarkDisclaimerDecision, setBookmarkDisclaimerDecision] = useState<string>(sessionStorage.getItem("bookmarkDisclaimerDecision") || "");
    const [bookmarkList, setBookmarkList] = useState<string[]>();

    const updateBookmarkDisclaimerDecision = async (bookmarkDecision: "all" | "selection"): Promise<boolean | undefined> => {
        try {
            sessionStorage.setItem("bookmarkDisclaimerDecision", bookmarkDecision);
            setBookmarkDisclaimerDecision(bookmarkDecision);

            const user = new UserData();
            const userData = await user.readUserData();

            if (userData) {
                const newUserData = userData;
                newUserData.disclaimer.bookmarksAll = bookmarkDecision === "all" ? true : false;

                const response = await user.updateUserData(newUserData);
                return response?.ok ? true : false;
            }
        } catch (error) {
            console.error(error);
            console.trace();
        }
    };

    const setBookmarkDisclaimerAll = async () => {
        const decisionResponse = await updateBookmarkDisclaimerDecision("all");

        if (decisionResponse) {
            try {
                const bookmarks = new Bookmarks();
                const response = await bookmarks.readBrowserBookmarkIDsList();

                if (response) {
                    setBookmarkList(response);
                }
            } catch (error) {
                logger.error("Unable setUserData", "FrontEnd", "Error", error);
                setIsError(true);
                setError(error);
            }
        }
    };

    const setBookmarkDisclaimerSelection = async () => {
        const decisionResponse = await updateBookmarkDisclaimerDecision("selection");

        if (decisionResponse) {
        }
    };

    const createBookmarkDocs = async (bookmarkIDList: string[]): Promise<void> => {
        setIsSaving(true);
        try {
            const user = new UserData();
            const userDataID = await user.readUserDataID();

            if (userDataID) {
                const bookmarks = new Bookmarks();
                const response = await bookmarks.createBookmarkDocsByIDs(bookmarkIDList, userDataID);

                if (response) {
                    Props.handleSetBookmarkedDone(true);
                }
            }
        } catch (error) {
            logger.error("Unable setUserData", "FrontEnd", "Error", error);
            setIsError(true);
            setError(error);
        }
    };

    useEffect(() => {
        setIsError(false);
        if (bookmarkList) {
            createBookmarkDocs(bookmarkList);
        }
    }, [bookmarkList]);

    if (isError) {
        const ErrorCard = lazy(() => import("../elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }

    const BookmarkSelection = () => {
        const BookmarkSelection_Component = lazy(() => import("./bookmarkSelection"));

        const handleSetBookmarkList = async (state: string[]) => {
            setBookmarkList(state);
        };
        return (
            <Row>
                <Col>
                    <BookmarkSelection_Component handleSetBookmarkList={handleSetBookmarkList} />
                </Col>
            </Row>
        );
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h3 className="mb-0">{t("BookmarkDisclaimerHeadline")}</h3>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{t("BookmarkDisclaimerDescription")}</Card.Text>
                            <p>
                                <small>{t("BookmarkDisclaimerText")}</small>
                            </p>
                            <Row>
                                <Col className="pt-3 text-center">
                                    <ButtonGroup>
                                        <Button onClick={() => setBookmarkDisclaimerAll()} variant="primary" className="text-light">
                                            {isSaving ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <BookmarkPlusFill />} {t("BookmarkDisclaimerAllButton")}
                                        </Button>
                                        <Button onClick={() => setBookmarkDisclaimerSelection()} variant="secondary" className="text-light">
                                            <BookmarkPlus /> {t("BookmarkDisclaimerSomeButton")}
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {bookmarkDisclaimerDecision === "selection" && <BookmarkSelection />}
        </Container>
    );
};

export default bookmarkDisclaimer;
