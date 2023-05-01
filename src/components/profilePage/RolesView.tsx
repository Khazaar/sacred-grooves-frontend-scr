import { UserRoles } from "@/enums";
import {
    Typography,
    Box,
    Tab,
    Card,
    List,
    ListItem,
    TextField,
} from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { profilePageEntityStyle } from "@/styles/muiComponentStyles";
import { useMobxContext } from "../layout/Layout";
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

function RolesView() {
    const mobxContext = useMobxContext();

    const [tabValue, setTabValue] = React.useState<string>("0");

    const handleTabChange = (event: React.SyntheticEvent, value: number) => {
        setTabValue(value.toString());
    };

    return (
        <Card sx={profilePageEntityStyle}>
            {mobxContext.profilesAll.currentProfile.artist.isActive && (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            width: "100%",
                        }}
                    >
                        <Box sx={{ width: "40%" }}>
                            <Typography variant="h6">Artist type:</Typography>
                            <List>
                                {mobxContext.profilesAll.currentProfile.artist.artistTypes.map(
                                    (artistType) => (
                                        <ListItem disablePadding>
                                            {artistType.isSelected && (
                                                <Typography variant="body1">
                                                    {artistType.artistTypeName}
                                                </Typography>
                                            )}
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </Box>
                        <Box sx={{ width: "40%" }}>
                            <Typography variant="h6">Music styles:</Typography>
                            <List>
                                {mobxContext.profilesAll.currentProfile.artist.musicStyles.map(
                                    (musicStyle) => (
                                        <ListItem disablePadding>
                                            {musicStyle.isSelected && (
                                                <Typography variant="body1">
                                                    {musicStyle.musicStyleName}
                                                </Typography>
                                            )}
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </Box>
                    </Box>
                    <Typography sx={{ margin: "0.5rem 0" }}>
                        Creativity description:
                    </Typography>
                    <TextField
                        sx={{ width: "100%" }}
                        multiline
                        rows={5}
                        disabled={true}
                        value={
                            mobxContext.profilesAll.currentProfile.artist
                                .creativityDescription
                        }
                    />
                </>
            )}

            {mobxContext.profilesAll.currentProfile.supportTeam.isActive && (
                <Card>
                    <Typography>Support Team:</Typography>
                </Card>
            )}
        </Card>
    );
}

export default observer(RolesView);
