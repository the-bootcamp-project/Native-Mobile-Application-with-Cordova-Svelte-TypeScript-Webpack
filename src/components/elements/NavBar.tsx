import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Window, BookmarkHeart } from "react-bootstrap-icons";

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

const SiteBar: React.FunctionComponent = (): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <Navbar bg="light" className="navbar shadow-sm ps-3 pt-3 bg-white rounded" expand>
            <Nav className="ml-auto">
                <Nav.Link href="dashboard.html">
                    <Window /> {t("PageDashboardTitle")}
                </Nav.Link>
                <Nav.Link href="bookmarks.html">
                    <BookmarkHeart /> {t("PageBookmarkTitle")}
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default SiteBar;
