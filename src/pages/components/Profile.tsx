import { UserRoles } from "@/enums";
import { ProfileModel } from "@/models/models";
import { createArtistMe } from "@/service/artist.service";
import { createOrganizer } from "@/service/organizer.service";
import { getProfileMy } from "@/service/profile.service";
import { getMe } from "@/service/user.service";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Typography, Button, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppMenu from "./AppMenu";
import { types } from "mobx-state-tree";
import { Entries } from "type-fest";
import { observer } from "mobx-react-lite";
import User from "./User";

type PrifileProps = {
    profile: ProfileModel | undefined;
};

// const RolesClaimed = types
//     .model({
//         Artist: false,
//         Organizer: false,
//         SupportTeam: false,
//         Visitor: false,
//     })
//     .actions((self) => ({
//         setRoleClaimed(role: UserRoles, value: boolean) {
//             self[role] = value;
//         },
//     }));

// const rolesClaimed = RolesClaimed.create();

function Profile({ profileProps }: { profileProps: PrifileProps }) {
    const [tabValue, setTabValue] = React.useState<string>("-1");

    useEffect(() => {
        if (profileProps.profile?.artist) {
            setTabValue("0");
            //rolesClaimed.setRoleClaimed(UserRoles.Artist, true);
        }
        if (profileProps.profile?.organizer) {
            //rolesClaimed.setRoleClaimed(UserRoles.Organizer, true);
            setTabValue("1");
        }
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
                    <User
                        userProps={{ user: profileProps.profile?.user }}
                    ></User>
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
                {tabValue != "-1" && (
                    <Box sx={{ minWidth: 600 }}>
                        <TabContext value={tabValue}>
                            <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                                <TabList
                                    onChange={handleTabChange}
                                    aria-label="basic tabs example"
                                >
                                    {/* {(
                                        Object.entries(rolesClaimed) as Entries<
                                            typeof rolesClaimed
                                        >
                                    ).map((key, index, array) => {
                                        if (key[1]) {
                                            return (
                                                <Tab
                                                    label={key[0].toString()}
                                                    value={index.toString()}
                                                    key={"tab" + key}
                                                ></Tab>
                                            );
                                        }
                                    })} */}
                                </TabList>
                            </Box>
                            {/* <TabPanel value="0">
                                {profileMy && (
                                    // <EditArtist userMe={userMy}></EditArtist>
                                )}
                            </TabPanel> */}
                            <TabPanel value="1">
                                <Button>Create event</Button>
                            </TabPanel>
                            <TabPanel value="2">Item Three</TabPanel>
                        </TabContext>
                    </Box>
                )}
            </Box>
        </>
    );
}
export default observer(Profile);
