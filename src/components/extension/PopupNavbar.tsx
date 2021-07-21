import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Window, BookmarkHeart } from "react-bootstrap-icons";

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import { Tabs } from "../../modules/browser";

const PopupNavbar: React.FunctionComponent = (): React.ReactElement => {
    const { t } = useTranslation();

    const handleClick = async (page: string) => {
        const tabs = new Tabs();
        await tabs.create(page);
    };

    return (
        <Navbar className="navbar p-0" expand>
            <Nav>
                <Nav.Link onClick={() => handleClick("dashboard.html")} title={t("PageDashboardTitle")}>
                    <Window />
                </Nav.Link>
                <Nav.Link onClick={() => handleClick("bookmarks.html")} title={t("PageBookmarkTitle")}>
                    <BookmarkHeart />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default PopupNavbar;
