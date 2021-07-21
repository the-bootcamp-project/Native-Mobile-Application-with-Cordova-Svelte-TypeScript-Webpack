import React, { useState, useEffect, lazy, Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useWindowSize from "react-use/lib/useWindowSize";

import { Logger } from "../modules/logs";
const logger = new Logger();

import { UserData } from "../modules/userdata";
import { Tabs } from "../modules/browser";

import LoadingCard from "../components/elements/LoadingCard";

const Welcome_Container: React.FunctionComponent = (): React.ReactElement => {
    const { width, height } = useWindowSize();

    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    const [userDataDone, setUserDataDone] = useState<boolean>(false);
    const [bookmarkedDone, setBookmarkedDone] = useState<boolean>(false);

    const [userDataWelcome, setUserDataWelcome] = useState<boolean>();
    const [usageData, setUsageData] = useState<boolean>();
    const [welcome, setWelcome] = useState<boolean>();

    const getSetUserData = async (): Promise<void> => {
        try {
            logger.debug("Start setUserDataWelcome", "FrontEnd", "Request");

            const user = new UserData();
            const response = await user.readUserData();

            if (response) {
                setUserDataWelcome(response.achievements.welcome);
                logger.info("Successfully setUserDataWelcome", "FrontEnd", "Response");
            }
        } catch (error) {
            logger.error("Unable setUserDataWelcome", "FrontEnd", "Error", error);

            setIsError(true);
            setError(error);
        }
    };

    const redirect = async (): Promise<void> => {
        try {
            logger.info("Start change Tab", "FrontEnd", "Request");
            const tabs = new Tabs();
            const response = await tabs.readCurrent();

            if (response) {
                const resultCreate = await tabs.create("dashboard.html");
                logger.info("Successfully createTab", "FrontEnd", "Response", resultCreate);

                if (typeof response.id === "number") {
                    const resultRemove = await tabs.delete(response.id);
                    logger.info("Successfully removeTab", "FrontEnd", "Response", resultRemove);
                }
            }
        } catch (error) {
            logger.error("Unable change Tab", "FrontEnd", "Error", error);
            return error;
        }
    };

    useEffect(() => {
        setIsError(false);
        getSetUserData();
    }, []);

    if (isError) {
        const ErrorCard = lazy(() => import("../components/elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }

    if (welcome || userDataWelcome) {
        redirect();
    }

    const NewUserOrRestore = () => {
        const NewUserOrRestore_Component = lazy(() => import("../components/user/newUserOrRestore"));
        const handleSetUserDataDone = async (state: boolean) => {
            setUserDataDone(state);
        };

        return <NewUserOrRestore_Component handleSetUserDataDone={handleSetUserDataDone} />;
    };

    const BookmarkDisclaimer = () => {
        const BookmarkDisclaimer_Component = lazy(() => import("../components/bookmarks/bookmarkDisclaimer"));
        const handleSetBookmarkedDone = async (state: boolean) => {
            setBookmarkedDone(state);
        };

        return <BookmarkDisclaimer_Component handleSetBookmarkedDone={handleSetBookmarkedDone} />;
    };

    const UsageDataDisclaimer = () => {
        const UsageDataDisclaimer_Component = lazy(() => import("../components/user/usageDataDisclaimer"));
        const handleSetUsageData = async (state: boolean) => {
            setUsageData(state);
        };
        const handleSetWelcome = async (state: boolean) => {
            setWelcome(state);
        };

        return (
            <React.Fragment>
                <Confetti />
                <Row>
                    <Col>
                        <Suspense fallback={<LoadingCard />}>
                            <UsageDataDisclaimer_Component handleSetUsageData={handleSetUsageData} handleSetWelcome={handleSetWelcome} />
                        </Suspense>
                    </Col>
                </Row>
            </React.Fragment>
        );
    };

    const Confetti = () => {
        const Confetti_Component = lazy(() => import("react-confetti"));

        if (usageData) {
            return <Confetti_Component recycle={false} numberOfPieces={500} width={width} height={height} />;
        } else {
            return null;
        }
    };

    const ComponentContainer = () => {
        if (userDataDone && !bookmarkedDone && !welcome && !userDataWelcome) {
            return <BookmarkDisclaimer />;
        } else if (userDataDone && bookmarkedDone && !welcome && !userDataWelcome) {
            return <UsageDataDisclaimer />;
        } else {
            return <NewUserOrRestore />;
        }
    };

    return (
        <Container>
            <ComponentContainer />
        </Container>
    );
};

export default Welcome_Container;
