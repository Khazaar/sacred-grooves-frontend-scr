import { UserRoles } from "@/enums";

import { createArtistMe } from "@/service/artist.service";
import { createOrganizer } from "@/service/organizer.service";
import { getMe } from "@/service/user.service";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Typography, Button, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import User from "./User";
import { ProfileModel } from "@/models/profileModel";
import Artist from "./Artist";

type PrifileProps = {
    profile: ProfileModel | undefined;
};

function ProfilePage({ profileProps }: { profileProps: PrifileProps }) {
    const [tabValue, setTabValue] = React.useState<string>("0");

    useEffect(() => {
        if (profileProps.profile?.artist) {
            setTabValue("0");
        }
        // if (profileProps.profile?.organizer) {
        //     setTabValue("1");
        // }
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, value: number) => {
        setTabValue(value.toString());
    };

    async function handleClaimRole(role: UserRoles) {
        switch (role) {
            case UserRoles.Artist:
                await createArtistMe();
                getMe().then((data) => {
                    //setUserMe(data);
                });
                setTabValue("0");
            case UserRoles.Organizer:
                await createOrganizer();
                getMe().then((data) => {
                    //setUserMe(data);
                });
                setTabValue("1");
            case UserRoles.SupportTeam:
                break;
            case UserRoles.Visitor:
                break;
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {profileProps.profile?.user && (
                    <User userProps={{ profile: profileProps.profile }} />
                )}
                <Typography variant="h6">Roles:</Typography>

                {profileProps.profile?.roles && (
                    <Box sx={{ minWidth: 600 }}>
                        <TabContext value={tabValue}>
                            <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                                <TabList
                                    onChange={handleTabChange}
                                    aria-label="basic tabs example"
                                >
                                    {profileProps.profile?.roles?.map(
                                        (key, index, array) => {
                                            if (key) {
                                                return (
                                                    <Tab
                                                        label={key.toString()}
                                                        value={index.toString()}
                                                        key={"tab" + key}
                                                    ></Tab>
                                                );
                                            }
                                        }
                                    )}
                                </TabList>
                            </Box>
                            <TabPanel value="0">
                                {profileProps.profile && (
                                    <Artist
                                        artistProps={{
                                            profile: profileProps.profile,
                                        }}
                                    />
                                )}
                            </TabPanel>
                            {/* <TabPanel value="1">
                            <Button>Create event</Button>
                        </TabPanel>
                        <TabPanel value="2">Item Three</TabPanel> */}
                        </TabContext>
                    </Box>
                )}

                <Box sx={{ display: "flex" }}>
                    <Typography variant="h6"> Claim role:</Typography>
                    {!profileProps?.profile?.artist && (
                        <Button
                            onClick={() => handleClaimRole(UserRoles.Artist)}
                        >
                            Artist
                        </Button>
                    )}
                    {!profileProps?.profile?.organizer && (
                        <Button
                            onClick={() => handleClaimRole(UserRoles.Organizer)}
                        >
                            Organizer
                        </Button>
                    )}
                    <Button>Support Team</Button>
                    <Button>Visitor</Button>
                </Box>
            </Box>
        </>
    );
}
export default observer(ProfilePage);
