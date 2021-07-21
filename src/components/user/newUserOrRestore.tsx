import React, { useState, useEffect, lazy } from "react";
import { Container, Card, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { PersonPlus, FolderPlus } from "react-bootstrap-icons";

import "../../_locales/i18n";
import { useTranslation } from "react-i18next";

interface Props {
    handleSetUserDataDone: (event: boolean) => void;
}

const NewUserOrRestore: React.FunctionComponent<Props> = (Props): React.ReactElement => {
    const { t } = useTranslation();

    const [isError, setIsError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>();

    const [newUserOrRestore, setNewUserOrRestore] = useState<string>(sessionStorage.getItem("newUserOrRestoreDecision") || "");
    const [userDataDone, setUserDataDone] = useState<boolean>(false);

    const setNewUserOrRestorDecision = async (decision: string) => {
        sessionStorage.setItem("newUserOrRestoreDecision", decision);
        setNewUserOrRestore(sessionStorage.getItem("newUserOrRestoreDecision") || decision);
    };

    useEffect(() => {
        try {
            if (userDataDone) {
                Props.handleSetUserDataDone(userDataDone);
            }
        } catch (error) {
            setIsError(true);
            setError(error);
        }
    }, [userDataDone]);

    if (isError) {
        const ErrorCard = lazy(() => import("../../components/elements/ErrorCard"));
        return <ErrorCard error={error} />;
    }

    const NewUser = () => {
        const NewUser_Component = lazy(() => import("./startNewUser"));

        const handleUserDataDone = async (state: boolean) => {
            setUserDataDone(state);
        };
        return (
            <Row>
                <Col>
                    <NewUser_Component handleUserDataDone={handleUserDataDone} />
                </Col>
            </Row>
        );
    };

    const RestoreBackup = () => {
        const RestoreBackup_Component = lazy(() => import("./startRestore"));

        const handleUserDataDone = async (state: boolean) => {
            setUserDataDone(state);
        };
        return (
            <Row>
                <Col>
                    <RestoreBackup_Component handleUserDataDone={handleUserDataDone} />
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
                            <h3 className="mb-0">{t("WelcomeNewUserHeadline")}</h3>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{t("WelcomeNewUserOrRestor")}</Card.Text>
                            <Row>
                                <Col className="pt-3 text-center">
                                    <ButtonGroup className="pt-3 text-center">
                                        <Button onClick={() => setNewUserOrRestorDecision("new")} variant="primary" className="text-light">
                                            <PersonPlus /> {t("WelcomeNewUserCreateUUID")}
                                        </Button>
                                        <Button onClick={() => setNewUserOrRestorDecision("restore")} variant="secondary" className="text-light">
                                            <FolderPlus /> {t("WelcomeNewUserOrStartRestor")}
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {newUserOrRestore === "new" && <NewUser />}
            {newUserOrRestore === "restore" && <RestoreBackup />}
        </Container>
    );
};

export default NewUserOrRestore;
