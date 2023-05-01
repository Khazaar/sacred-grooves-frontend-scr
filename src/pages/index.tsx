import { useUser } from "@auth0/nextjs-auth0/client";
import { Box } from "@mui/material";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Wellcome from "./wellcome";

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Wellcome></Wellcome>
        </Box>
    );
}
