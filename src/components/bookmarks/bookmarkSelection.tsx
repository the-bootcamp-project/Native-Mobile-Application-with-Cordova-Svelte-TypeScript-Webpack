import React, { useState, useEffect, lazy } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Square, CheckSquare, DashSquare, PlusSquare, ChevronRight, ChevronDown, Folder, Folder2Open, Bookmark, ArrowDownRightSquare, BookmarkPlusFill } from "react-bootstrap-icons";
import CheckboxTree from "react-checkbox-tree";

import { Logger } from "../../modules/logs";
const logger = new Logger();

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import { Bookmarks } from "../../modules/browser";

import "../../assets/styles/react-checkbox-tree.scss";

interface Props {
    handleSetBookmarkList: (event: string[]) => void;
}

const BookmarkSelection: React.FunctionComponent<Props> = (Props): React.ReactElement => {
    const { t } = useTranslation();

    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    // Type 'ConvertedBookmarkTreeNode' is missing the following properties from type 'Node[]': length, pop, push, concat, and 28 more.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [bookmarkTree, setBookmarkTree] = useState<any>();

    const [selectedBookamrks, setSelectedBookmarks] = useState<string[]>([]);
    const [expandedTree, setExpandedTree] = useState<string[]>([]);

    const updateSetBookmarkSelection = async (): Promise<void> => {
        try {
            logger.debug("Start updateSetBookmarkSelection", "FrontEnd", "Request");

            const bookmarks = new Bookmarks();
            const treeView = await bookmarks.createBrowserBookmarkSelection();

            if (treeView) {
                setBookmarkTree(treeView);
                logger.info("Successfully updateSetBookmarkSelection", "FrontEnd", "Response");
            }
        } catch (error) {
            logger.error("Unable updateSetBookmarkSelection", "FrontEnd", "Error", error);
            setIsError(true);
            setError(error);
        }
    };

    const updateSetBookmarkList = async (): Promise<void> => {
        if (selectedBookamrks) {
            Props.handleSetBookmarkList(selectedBookamrks);
        }
    };

    useEffect(() => {
        updateSetBookmarkSelection();
    }, []);

    if (isError) {
        const ErrorCard = lazy(() => import("../elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }

    return (
        <Card>
            <Card.Header>
                <h3 className="mb-0">{t("BookmarkSelectionHeadline")}</h3>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        {!bookmarkTree ? (
                            <p>{t("LoadingCardHeader")}</p>
                        ) : (
                            <CheckboxTree
                                nodes={bookmarkTree}
                                checked={selectedBookamrks}
                                onCheck={(checked) => setSelectedBookmarks(checked)}
                                expanded={expandedTree}
                                onExpand={(expanded) => setExpandedTree(expanded)}
                                optimisticToggle={false}
                                expandOnClick
                                icons={{
                                    check: <CheckSquare />,
                                    uncheck: <Square />,

                                    halfCheck: <ArrowDownRightSquare />,

                                    expandClose: <ChevronRight />,
                                    expandOpen: <ChevronDown />,

                                    expandAll: <PlusSquare />,
                                    collapseAll: <DashSquare />,

                                    parentClose: <Folder />,
                                    parentOpen: <Folder2Open />,

                                    leaf: <Bookmark />,
                                }}
                            />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col className="pt-3 text-center">
                        {selectedBookamrks.length == 0 ? (
                            <Button variant="primary" disabled>
                                <Bookmark /> {t("BookmarkNoSelected")}
                            </Button>
                        ) : (
                            <Button onClick={() => updateSetBookmarkList()} variant="primary">
                                <BookmarkPlusFill /> {t("BookmarkSelectedPart1")} {selectedBookamrks.length} {t("BookmarkSelectedPart2")}
                            </Button>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default BookmarkSelection;
