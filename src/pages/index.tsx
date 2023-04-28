import { useUser } from "@auth0/nextjs-auth0/client";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import { Inter } from "next/font/google";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Index() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.push("/profiles");
        } else {
        }
    }, [user]);

    return (
        <>
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
        </>
    );
}
