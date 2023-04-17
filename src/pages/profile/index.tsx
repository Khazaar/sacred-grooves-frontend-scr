import React, { useEffect, useState } from "react";
import AppMenu from "@/components/AppMenu";
import { Box, Button, Tabs, Typography } from "@mui/material";
import ShowUserMe from "./user/showUserMe";
import { getMe } from "@/service/user.service";
import { UserRoles } from "@/enums";
import EditArtist from "./artist/editArtist";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createArtist } from "@/service/artist.service";
import { createOrganizer } from "@/service/organizer.service";
import { Entries } from "type-fest";
import { types } from "mobx-state-tree";

const RolesClaimed = types
    .model({
        Artist: false,
        Organizer: false,
        SupportTeam: false,
        Visitor: false,
    })
    .actions((self) => ({
        setRoleClaimed(role: UserRoles, value: boolean) {
            self[role] = value;
        },
    }));

const rolesClaimed = RolesClaimed.create();

// interface IRolesClaimed {
//     [UserRoles.Artist]: boolean;
//     [UserRoles.Organizer]: boolean;
//     [UserRoles.SupportTeam]: boolean;
//     [UserRoles.Visitor]: boolean;
// }

export default function Profile() {
    const [userMe, setUserMe] = useState<IUserDto>();
    const [tabValue, setTabValue] = React.useState<string>("-1");

    useEffect(() => {
        getMe().then((data) => {
            setUserMe(data);
        });
    }, []);

    useEffect(() => {
        console.log(rolesClaimed);
    }, [rolesClaimed]);

    useEffect(() => {
        if (userMe?.artist) {
            setTabValue("0");
            rolesClaimed.setRoleClaimed(UserRoles.Artist, true);
        }
        if (userMe?.organizer) {
            rolesClaimed.setRoleClaimed(UserRoles.Organizer, true);
            setTabValue("1");
        }
    }, [userMe]);

    const handleTabChange = (event: React.SyntheticEvent, value: number) => {
        setTabValue(value.toString());
    };

    async function handleClaimRole(role: UserRoles) {
        switch (role) {
            case UserRoles.Artist:
                await createArtist();
                getMe().then((data) => {
                    setUserMe(data);
                });
                setTabValue("0");
            case UserRoles.Organizer:
                await createOrganizer();
                getMe().then((data) => {
                    setUserMe(data);
                });
                setTabValue("1");
            case UserRoles.SupportTeam:
                break;
            case UserRoles.Visitor:
                break;
        }
    }
    interface TabPanelProps {
        children?: React.ReactNode;
        dir?: string;
        index: number;
        value: number;
    }

    return (
        <>
            <AppMenu></AppMenu>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {userMe && <ShowUserMe userMe={userMe}></ShowUserMe>}
                <Box sx={{ display: "flex" }}>
                    <Typography variant="h6"> Claim role:</Typography>
                    {rolesClaimed && !rolesClaimed[UserRoles.Artist] && (
                        <Button
                            onClick={() => handleClaimRole(UserRoles.Artist)}
                        >
                            Artist
                        </Button>
                    )}
                    {rolesClaimed && !rolesClaimed[UserRoles.Organizer] && (
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
                                    {(
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
                                    })}
                                </TabList>
                            </Box>
                            <TabPanel value="0">
                                {userMe && (
                                    <EditArtist userMe={userMe}></EditArtist>
                                )}
                            </TabPanel>
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
