import React, { useState, useEffect, lazy } from "react";
import { Card, Button, Table } from "react-bootstrap";
import { QuestionOctagon, ArrowsFullscreen, BarChartLine, Justify, PatchCheck, InfoCircle, ExclamationDiamond } from "react-bootstrap-icons";

import { Logger } from "../../modules/logs";
const logger = new Logger();

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import { Bookmarks, BookmarkDoc } from "../../modules/browser";

interface Props {
    handleSetTableType: string;
}

const BookmarkWidget_Component: React.FunctionComponent<Props> = (Props): React.ReactElement => {
    const { t } = useTranslation();

    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    const [bookmark, setBookmark] = useState<BookmarkDoc[]>([]);
    const [bookmarkCount, setBookmarkCount] = useState<number>();

    const [style, setStyleType] = useState<string>();

    const readBookmarkDocs = async (type: string) => {
        try {
            logger.debug("Start setBookmarkError", "FrontEnd", "Request");

            const bookmarks = new Bookmarks();

            const bookmarksByType = await bookmarks.readBookmarkDocsByType(type);
            if (bookmarksByType) {
                if (bookmarksByType?.docs.length > 1) {
                    setBookmark(bookmarksByType.docs);
                    setBookmarkCount(bookmarksByType.docs.length);
                    logger.info("Successfully setBookmarkError", "FrontEnd", "Response");
                }
            }
        } catch (error) {
            logger.error("Unable setBookmarkError", "FrontEnd", "Error", error);
            setIsError(true);
            setError(error);
        }
    };

    useEffect(() => {
        setIsError(false);
        switch (Props.handleSetTableType) {
            case "success":
                setStyleType("success");
                break;
            case "info":
                setStyleType("info");
                break;
            case "warning":
                setStyleType("warning");
                break;
            case "error":
                setStyleType("danger");
                break;
        }
        readBookmarkDocs(Props.handleSetTableType);
    }, []);

    if (isError) {
        const ErrorCard = lazy(() => import("../elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }

    const renderTable = (bookmarks: BookmarkDoc, index: number) => {
        return (
            <tr key={index}>
                <td>
                    <a title={unescape(bookmarks.title)} href={"documentView.html?id=" + bookmarks._id} target="blank">
                        {unescape(bookmarks.title)}
                    </a>
                </td>
            </tr>
        );
    };

    return (
        <Card border={style}>
            <Card.Header>
                {style === "success" && <PatchCheck />}
                {style === "info" && <InfoCircle />}
                {style === "warning" && <QuestionOctagon />}
                {style === "danger" && <ExclamationDiamond />} {bookmarkCount} {t("BookmarkDescriptionError")}
            </Card.Header>
            <Card.Body className="p-0">
                <Table striped hover size="sm" className="mb-0">
                    <tbody>{bookmark?.map(renderTable)}</tbody>
                </Table>
            </Card.Body>
            <Card.Footer className="text-muted text-right p-1">
                <Button className="ml-1" size="sm" variant={"outline-" + style}>
                    <Justify />
                </Button>
                <Button className="ml-1" size="sm" variant={"outline-" + style}>
                    <BarChartLine />
                </Button>
                <Button className="ml-1" size="sm" variant={"outline-" + style}>
                    <ArrowsFullscreen />
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default BookmarkWidget_Component;
