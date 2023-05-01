import { ProfileModel } from "@/models/profileModel";

import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

type SupportTeamProps = {
    profile: ProfileModel;
};

function SupportTeam({
    supportTeamProps,
}: {
    supportTeamProps: SupportTeamProps;
}) {
    const handleSaveArtist = async () => {};

    return (
        <Box>
            <Typography>Support Team component</Typography>
        </Box>
    );
}

export default observer(SupportTeam);
