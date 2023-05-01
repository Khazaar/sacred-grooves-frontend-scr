import { ProfileModel } from "@/models/profileModel";

import {
    Box,
    Button,
    Card,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

type OrganizerProps = {
    profile: ProfileModel;
};

function OrganizerPanel({
    organizerProps,
}: {
    organizerProps: OrganizerProps;
}) {
    const handleSaveArtist = async () => {};

    return (
        <Card sx={{ padding: "1rem", marginTop: "1rem" }}>
            <Typography>Organizer panel</Typography>
            <Button>Create Event</Button>
        </Card>
    );
}

export default observer(OrganizerPanel);
