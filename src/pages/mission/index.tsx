import { Card, Typography } from "@mui/material";
import React from "react";

export default function index() {
    return (
        <>
            <Card sx={{ padding: 1 }}>
                <Typography variant="h4">Our mission</Typography>
                <Typography variant="body1">
                    Our mission is to build strong community, help musicians and
                    organizers creating gread evenst and share their creativity
                </Typography>
            </Card>
        </>
    );
}
