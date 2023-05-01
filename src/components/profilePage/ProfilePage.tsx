import { UserRoles } from "@/enums";

import { Box, Typography, Button, Tab, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import User from "./User";
import { ProfileModel } from "@/models/profileModel";
import { useProfileMy } from "../Layout";
import { updateProfileMe } from "@/service/profile.service";
import RolesEdit from "./RolesEdit";
import RolesView from "./RolesView";
import OrganizerPanel from "./OrganizerPanel";

type PrifileProps = {
    profile: ProfileModel;
};

function ProfilePage({ profileProps }: { profileProps: PrifileProps }) {
    const profileMy = useProfileMy();
    const isProfileMe = profileProps.profile.auth0sub == profileMy.auth0sub;
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
                {!profileMy.isEditing && isProfileMe && (
                    <Box>
                        <Button
                            onClick={() => {
                                profileMy.isEditing = true;
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
                    {profileMy.isEditing && (
                        <Button
                            onClick={async () => {
                                await updateProfileMe(profileMy);
                                profileMy.isEditing = false;
                            }}
                        >
                            Save changes
                        </Button>
                    )}
                </Box>
            </Box>

            <User
                userProps={{
                    profile: profileProps.profile.isEditing
                        ? profileMy
                        : profileProps.profile,
                }}
            />

            {profileProps.profile.isEditing ? <RolesEdit /> : <RolesView />}
            {profileProps.profile.organizer.isActive && (
                <OrganizerPanel
                    organizerProps={{ profile: profileProps.profile }}
                ></OrganizerPanel>
            )}
        </Box>
    );
}
export default observer(ProfilePage);
