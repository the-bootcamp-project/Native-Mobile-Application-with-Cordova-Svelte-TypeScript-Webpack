import React, { useState, useEffect, lazy } from "react";
import { Card, Row, Col, Alert, Button, Spinner } from "react-bootstrap";
import { Download, ArrowRepeat } from "react-bootstrap-icons";
import FileSaver from "file-saver";

import { Logger } from "../../modules/logs";
const logger = new Logger();

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

import { DEF_BACKUP_NAME } from "../../constants";
import { IndexedDB } from "../../modules/database";
import { UserData, IUserData } from "../../modules/userdata";
import { getUUID } from "../../modules/misc";

interface Props {
    handleUserDataDone: (event: boolean) => void;
}

const NewUser: React.FunctionComponent<Props> = (Props): React.ReactElement => {
    const { t } = useTranslation();

    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    const [createdNewUserData, setNewUserData] = useState<IUserData>();
    const [createdNewUserID, setNewUserID] = useState<string>();
    const [newUserDataUpdated, setNewUserUpdated] = useState<boolean>(false);

    const [downloadSpinner, setDownloadSpinner] = useState<boolean>(false);
    const [easterEggCounter, setEasterEggCounter] = useState<number>(0);

    const createNewUserData = async (): Promise<void> => {
        try {
            const user = new UserData();
            const response = await user.readUserData();

            if (response) {
                setNewUserData(response);
            }
        } catch (error) {
            logger.error("Unable setUserData", "FrontEnd", "Error", error);
            setIsError(true);
            setError(error);
        }
    };

    const createNewUserID = async (): Promise<void> => {
        try {
            const newUUID = await getUUID();
            if (newUUID) {
                setNewUserID(newUUID);
            }

            triggerEasterEggCursor();
        } catch (error) {
            logger.error("Unable setUserData", "FrontEnd", "Error", error);
            setIsError(true);
            setError(error);
        }
    };

    const updateNewUserData = async (newUserID: string): Promise<void> => {
        try {
            if (createdNewUserData && newUserID) {
                const newUserData = createdNewUserData;
                newUserData.userID = newUserID;

                const user = new UserData();
                const response = await user.updateUserData(newUserData);

                if (response?.ok) {
                    setNewUserUpdated(true);
                }
            }
        } catch (error) {
            logger.error("Unable setUserData", "FrontEnd", "Error", error);
            setIsError(true);
            setError(error);
        }
    };

    const downloadBackup = async (downloaded: boolean) => {
        if (newUserDataUpdated) {
            setDownloadSpinner(true);

            const db = new IndexedDB();
            const dump = await db.dump();

            const blob = new Blob([JSON.stringify(dump)], {
                type: "application/octet-stream",
            });
            FileSaver.saveAs(blob, DEF_BACKUP_NAME + Date.now());

            setDownloadSpinner(false);

            if (downloaded) {
                Props.handleUserDataDone(true);
            }
        }
    };

    const triggerEasterEggCursor = async () => {
        setEasterEggCounter(easterEggCounter + 1);
    };

    useEffect(() => {
        createNewUserData();
    }, []);

    useEffect(() => {
        createNewUserID();
    }, [createdNewUserData]);

    useEffect(() => {
        if (createdNewUserID) {
            updateNewUserData(createdNewUserID);
        }
    }, [createdNewUserID]);

    if (isError) {
        const ErrorCard = lazy(() => import("../../components/elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }

    return (
        <Card>
            <Card.Header>
                <h3 className="mb-0">{t("WelcomeNewUserCreateUUID")}</h3>
            </Card.Header>
            <Card.Body>
                <Card.Text>{t("WelcomeNewUserIDCreated")}</Card.Text>
                <Row>
                    <Col className="pt-3 text-center">
                        <Alert variant="primary">
                            <Row>
                                <Col sm={11}>{createdNewUserID}</Col>

                                {easterEggCounter >= 50 ? (
                                    <Col sm={1} className="text-right text-secondary EasterEggCursor">
                                        <ArrowRepeat onClick={() => createNewUserID()} />
                                    </Col>
                                ) : (
                                    <Col sm={1} className="text-right text-secondary">
                                        <ArrowRepeat onClick={() => createNewUserID()} />
                                    </Col>
                                )}
                            </Row>
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col className="pt-3 text-center">
                        <Button onClick={() => downloadBackup(true)} variant="primary" className="text-light">
                            {downloadSpinner ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <Download />} {t("ActionButtonBackup")}
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default NewUser;
