import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";
import React from "react";

export default function Wellcome() {
    return (
        <Box sx={{ margin: "2rem auto", width: "70%" }}>
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
                    <Button href="/api/auth/logout">Logout</Button>
                </CardActions>
            </Card>
        </Box>
    );
}
