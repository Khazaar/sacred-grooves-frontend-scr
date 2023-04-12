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
import { createArtist } from "@/servise/artist.service";

interface IRoleClaimed {
    role: UserRoles;
    isClaimed: boolean;
}

export default function Profile() {
    //const accessToken = getAccessToken(req, res);
    //console.log(accessToken);
    const [rolesClaimed, setRolesClaimed] = useState<IRoleClaimed[]>([
        { role: UserRoles.Artist, isClaimed: false },
        { role: UserRoles.Organizer, isClaimed: false },
        { role: UserRoles.SupportTeam, isClaimed: false },
        { role: UserRoles.Visitor, isClaimed: false },
    ]);
    const [userMe, setUserMe] = useState<IUserDto>();
    const [tabValue, setTabValue] = React.useState("0");

    useEffect(() => {
        getMe().then((data) => {
            setUserMe(data);
        });
    }, []);

    useEffect(() => {
        if (userMe?.artist) {
            setRolesClaimed(
                rolesClaimed.map((role) =>
                    role.role == UserRoles.Artist
                        ? { ...role, isClaimed: true }
                        : role
                )
            );
            setTabValue("1");
        }
    }, [userMe]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    async function handleClaimRole(role: UserRoles) {
        switch (role) {
            case UserRoles.Artist:
                await createArtist();
                getMe().then((data) => {
                    setUserMe(data);
                });
                setTabValue("1");
            case UserRoles.Organizer:
                break;
            case UserRoles.SupportTeam:
                break;
            case UserRoles.Visitor:
                break;
        }
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
                    {!rolesClaimed[0].isClaimed && (
                        <Button
                            onClick={() => handleClaimRole(UserRoles.Artist)}
                        >
                            Artist
                        </Button>
                    )}
                    <Button>Organizer</Button>
                    <Button>SupportTeam</Button>
                    <Button>Visitor</Button>
                </Box>
                {tabValue != "0" && (
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
                                                key={"tab" + role.role}
                                            ></Tab>
                                        );
                                    }
                                })}
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {userMe && (
                                <EditArtist userMe={userMe}></EditArtist>
                            )}
                        </TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                )}
            </Box>
        </>
    );
}
