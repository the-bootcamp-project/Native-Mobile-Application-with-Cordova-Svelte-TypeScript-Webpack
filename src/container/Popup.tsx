import React, { useState, useEffect, lazy, Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Logger } from "../modules/logs";
const logger = new Logger();

import { UserData, IUserData } from "../modules/userdata";
import { Bookmarks } from "../modules/browser";
import { Tabs, tabType } from "../modules/browser";

import PopupCard_Loading from "../components/extension/PopupCard_Loading";

const Popup_Container: React.FunctionComponent = (): React.ReactElement => {
    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    const [userData, setUserData] = useState<IUserData>();
    const [tabData, setTabData] = useState<tabType | undefined>();
    const [isBookmarked, setIsBookmarked] = useState<boolean>();

    const getSetUserData = async (): Promise<void> => {
        try {
            const user = new UserData();
            const response = await user.readUserData();

            if (response) {
                setUserData(response);
            }
        } catch (error) {
            logger.error("Unable setUserData", "FrontEnd", "Error", error);
            setIsError(true);
            setError(error);
        }
    };

    const readTab = async (): Promise<void> => {
        try {
            const tabs = new Tabs();
            const resTab = await tabs.readCurrent();

            if (resTab) {
                setTabData(resTab);
                logger.info("Successfully setTabDataState", "FrontEnd", "Response");
            }
        } catch (error) {
            logger.error("Unable setTabDataState", "FrontEnd", "Error", error);

            setIsError(true);
            setError(error);
        }
    };

    const isBookamrked = async (tabURL: string): Promise<void> => {
        try {
            const bookmarks = new Bookmarks();
            const response = await bookmarks.readIsBookmarked(tabURL);
            setIsBookmarked(response);
            logger.info("Successfully setIsBookmarkedState", "FrontEnd", "Response");
        } catch (error) {
            logger.error("Unable setIsBookmarkedState", "FrontEnd", "Error", error);

            setIsError(true);
            setError(error);
        }
    };

    useEffect(() => {
        setIsError(false);
        getSetUserData();
    }, []);

    useEffect(() => {
        setIsError(false);
        if (userData?.disclaimer.tabsObserverInfo) {
            readTab();
        }
    }, [userData]);

    useEffect(() => {
        setIsError(false);
        if (tabData?.url) {
            isBookamrked(tabData.url);
        }
    }, [tabData]);

    if (isError) {
        const ErrorCard = lazy(() => import("../components/elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }

    const PopupCard_WelcomeUndone = () => {
        const PopupCard_WelcomeUndone_Component = lazy(() => import("../components/extension/PopupCard_WelcomeUndone"));

        return <PopupCard_WelcomeUndone_Component />;
    };
    const PopupCard_URLBookmarked = () => {
        if (tabData) {
            const PopupCard_URLBookmarked_Component = lazy(() => import("../components/extension/PopupCard_URLBookmarked"));

            return <PopupCard_URLBookmarked_Component tabData={tabData} />;
        } else {
            return null;
        }
    };
    const PopupCard_URLUnkown = () => {
        const PopupCard_URLUnkown_Component = lazy(() => import("../components/extension/PopupCard_URLUnkown"));

        return <PopupCard_URLUnkown_Component />;
    };

    const ComponentContainer = () => {
        if (!isBookmarked) {
            return <PopupCard_URLUnkown />;
        } else if (isBookmarked && tabData) {
            return <PopupCard_URLBookmarked />;
        } else if (!userData?.achievements.welcome) {
            return <PopupCard_WelcomeUndone />;
        } else {
            return null;
        }
    };

    return (
        <Container style={{ width: "32rem" }}>
            <Row>
                <Col className="p-0 text-center">
                    <Suspense fallback={<PopupCard_Loading />}>
                        <ComponentContainer />
                    </Suspense>
                </Col>
            </Row>
        </Container>
    );
};

export default Popup_Container;
