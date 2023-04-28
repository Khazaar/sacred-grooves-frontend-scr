import { Box, Typography, Button, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { SxProps } from "@mui/material";
import { ProfileModel } from "@/models/profileModel";

type ProfileItemProps = {
    profile: ProfileModel | undefined;
};

const ProfileItemStyle: SxProps = {
    margin: 1,
};

function ProfileItem({
    profileItemProps,
}: {
    profileItemProps: ProfileItemProps;
}) {
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                {/* <Box sx={ProfileItemStyle}>
                    <Typography variant="body1">
                        {profileItemProps.profile?.auth0sub}
                    </Typography>
                </Box> */}
                <Box sx={ProfileItemStyle}>
                    <Typography variant="body1">
                        {profileItemProps.profile?.user.email}
                    </Typography>
                </Box>
                <Box sx={ProfileItemStyle}>
                    <Typography variant="body1">
                        {profileItemProps.profile?.user.nickName}
                    </Typography>
                </Box>
                <Box sx={ProfileItemStyle}>
                    <Typography variant="body1">
                        {profileItemProps.profile?.user.firstName}
                    </Typography>
                </Box>
                <Box sx={ProfileItemStyle}>
                    <Typography variant="body1">
                        {profileItemProps.profile?.user.lastName}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
export default observer(ProfileItem);
