import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Button, Card } from "@mui/material";
import { Inter } from "next/font/google";

import Link from "next/link";
import AppMenu from "@/components/AppMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Wellcome from "./Wellcome";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.push("/profile");
        } else {
            router.push("/wellcome");
        }
    }, [user]);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <AppMenu></AppMenu>
        </Box>
    );
}
