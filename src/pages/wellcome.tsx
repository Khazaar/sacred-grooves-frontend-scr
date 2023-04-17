import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import React from "react";

export default function Wellcome() {
    return (
        <Box sx={{ marginTop: "2rem" }}>
            <Card sx={{ minWidth: 275, maxWidth: 500 }}>
                <CardContent>
                    <Typography
                        color="text.secondary"
                        gutterBottom
                        variant="h5"
                    >
                        Wellcome to the Sacred Grooves!!
                    </Typography>

                    <Typography variant="body2">
                        Our platform is designet to leverage communication
                        between DJs, musicians, and organizers.
                    </Typography>
                    <Typography variant="body1" component="div">
                        Please, login to the platform
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href="/api/auth/login">Login</Button>
                </CardActions>
            </Card>
        </Box>
    );
}
