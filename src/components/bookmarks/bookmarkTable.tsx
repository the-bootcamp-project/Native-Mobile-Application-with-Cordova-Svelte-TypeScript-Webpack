import React, { useState, useEffect, lazy } from "react";
import { Table } from "react-bootstrap";

import { Logger } from "../../modules/logs";
const logger = new Logger();

import { Bookmarks, BookmarkDoc } from "../../modules/browser";

interface Props {
    handleSetTableType: string;
}

const BookmarkTable_Component: React.FunctionComponent<Props> = (Props): React.ReactElement => {
    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    const [bookmark, setBookmark] = useState<BookmarkDoc[]>([]);
    const [bookmarkCount, setBookmarkCount] = useState<number>();

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
        <Table striped hover size="sm" className="mb-0">
            <tbody>{bookmark?.map(renderTable)}</tbody>
        </Table>
    );
};

export default BookmarkTable_Component;
