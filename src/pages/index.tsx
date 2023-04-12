import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Button, Card } from "@mui/material";
import { Inter } from "next/font/google";

import Link from "next/link";
import AppMenu from "@/components/AppMenu";
import Wellcome from "@/components/Wellcome";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    if (user) {
        router.push("/profile");
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <AppMenu></AppMenu>
            {!user && <Wellcome></Wellcome>}
        </Box>
    );
}
