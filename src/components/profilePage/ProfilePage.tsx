import { UserRoles } from "@/enums";

import { Box, Typography, Button, Tab, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import User from "./User";
import { ProfileModel } from "@/models/profileModel";

import { updateProfileMe } from "@/service/profile.service";
import RolesEdit from "./RolesEdit";
import RolesView from "./RolesView";
import OrganizerPanel from "./OrganizerPanel";
import { useMobxContext } from "../layout/Layout";

type ProfileProps = {
    profile: ProfileModel;
};

function ProfilePage({ profileProps }: { profileProps: ProfileProps }) {
    const mobxContext = useMobxContext();
    const isProfileMe =
        profileProps.profile.auth0sub == mobxContext.profileMy.auth0sub;
    const currentProfile = isProfileMe
        ? mobxContext.profileMy
        : mobxContext.profilesAll.currentProfile;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "1rem 0 0 0",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h5" component="div">
                    Profile information
                </Typography>
                {!currentProfile.isEditing && isProfileMe && (
                    <Box>
                        <Button
                            onClick={() => {
                                currentProfile.isEditing = true;
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            href="/api/auth/logout"
                        >
                            Log out
                        </Button>
                    </Box>
                )}
                <Box sx={{ display: "flex" }}>
                    {currentProfile.isEditing && (
                        <Button
                            onClick={async () => {
                                await updateProfileMe(currentProfile);
                                currentProfile.isEditing = false;
                            }}
                        >
                            Save changes
                        </Button>
                    )}
                </Box>
            </Box>

            <User
                userProps={{
                    profile: currentProfile,
                }}
            />

            {currentProfile.isEditing ? <RolesEdit /> : <RolesView />}
            {currentProfile.organizer.isActive && (
                <OrganizerPanel
                    organizerProps={{ profile: currentProfile }}
                ></OrganizerPanel>
            )}
        </Box>
    );
}
export default observer(ProfilePage);
