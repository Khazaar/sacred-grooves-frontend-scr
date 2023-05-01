import { UserRoles } from "@/enums";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Typography, Box, Tab, Button } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import Artist from "./ArtistEdit";

import Organizer from "./OrganizerPanel";
import { useProfileMy } from "../Layout";
import SupportTeam from "./SupportTeam";
import ArtistEdit from "./ArtistEdit";
import { ArtistModel } from "@/models/artistModel";
import { profilePageEntityStyle } from "@/styles/muiComponentStyles";
type Tab = {
    label: string;
    value: number;
};
const tabs: Tab[] = [
    {
        label: UserRoles.Artist.toString(),
        value: 1,
    },
    {
        label: UserRoles.Organizer.toString(),
        value: 2,
    },
    {
        label: UserRoles.SupportTeam.toString(),
        value: 3,
    },
];

function RolesEdit() {
    const profileMy = useProfileMy();
    const [tabValue, setTabValue] = React.useState<string>("0");

    const handleTabChange = (event: React.SyntheticEvent, value: number) => {
        setTabValue(value.toString());
    };
    return (
        <Box sx={profilePageEntityStyle}>
            <Typography variant="h6">Roles:</Typography>

            <TabContext value={tabValue}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                    }}
                >
                    <TabList
                        onChange={handleTabChange}
                        aria-label="basic tabs example"
                    >
                        {tabs.map((key, index, array) => {
                            if (key) {
                                return (
                                    <Tab
                                        label={key.label.toString()}
                                        value={index.toString()}
                                        key={"tab" + key.label.toString()}
                                    ></Tab>
                                );
                            }
                        })}
                    </TabList>
                </Box>
                <TabPanel value="0">
                    {profileMy.artist.isActive ? (
                        <ArtistEdit />
                    ) : (
                        <Button
                            onClick={async () => {
                                profileMy.artist.isActive = true;
                            }}
                        >
                            Become an artist
                        </Button>
                    )}
                </TabPanel>
                <TabPanel value="1">
                    {!profileMy.organizer.isActive ? (
                        <Button
                            onClick={async () => {
                                profileMy.organizer.isActive = true;
                            }}
                        >
                            Become an organizer
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                profileMy.organizer.isActive = false;
                            }}
                        >
                            Delete organizer data
                        </Button>
                    )}
                </TabPanel>
                <TabPanel value="2">
                    {!profileMy.supportTeam.isActive ? (
                        <Button
                            onClick={() => {
                                profileMy.supportTeam.isActive = true;
                            }}
                        >
                            Join support team
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                profileMy.supportTeam.isActive = false;
                            }}
                        >
                            Leave support team
                        </Button>
                    )}
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default observer(RolesEdit);
