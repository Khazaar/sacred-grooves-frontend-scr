import { useUser } from "@auth0/nextjs-auth0/client";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { Inter } from "next/font/google";

import { theme } from "@/assets/theme";
import AppMenu from "@/pages/components/AppMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileModel } from "@/models/models";
import { getProfiles } from "@/service/profile.service";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.push("/profile");
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
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
