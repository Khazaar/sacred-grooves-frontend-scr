import React, { useEffect, useState } from "react";
import AppMenu from "@/components/AppMenu";
import { Box, Button, Typography } from "@mui/material";
import ShowUserMe from "./user/showUserMe";
import { getMe } from "@/servise/user.service";
import { UserRoles } from "@/enums";
import EditArtist from "./artist/editArtist";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

interface IRoleClaimed {
    role: UserRoles;
    isClaimed: boolean;
}

export default function Profile() {
    //const accessToken = getAccessToken(req, res);
    //console.log(accessToken);
    const [rolesClaimed, setRolesClaimed] = useState<IRoleClaimed[]>([
        { role: UserRoles.Artist, isClaimed: true },
        { role: UserRoles.Organizer, isClaimed: true },
        { role: UserRoles.SupportTeam, isClaimed: false },
        { role: UserRoles.Visitor, isClaimed: false },
    ]);
    const [userMe, setUserMe] = useState<IUserDto>();
    const [tabValue, setTabValue] = React.useState("1");

    useEffect(() => {
        getMe().then((data) => {
            setUserMe(data);
        });
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    return (
        <>
            <AppMenu></AppMenu>
            <Typography variant="h4">Profile</Typography>
            {userMe && <ShowUserMe userMe={userMe}></ShowUserMe>}
            <Button href="/profile/user/editUserMe">
                Edit user information
            </Button>
            <Box sx={{ display: "flex" }}>
                <Typography variant="h6"> Claim role:</Typography>
                <Button>Artist</Button>
                <Button>Organizer</Button>
                <Button>SupportTeam</Button>
                <Button>Visitor</Button>
            </Box>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={handleTabChange}
                        aria-label="lab API tabs example"
                    >
                        {rolesClaimed.map((role, index) => {
                            if (role.isClaimed) {
                                return (
                                    <Tab
                                        label={role.role}
                                        value={(index + 1).toString()}
                                    ></Tab>
                                );
                            }
                        })}
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <EditArtist></EditArtist>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </>
    );
}
