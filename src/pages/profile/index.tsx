import React from "react";
import AppMenu from "@/components/AppMenu";
import { Button } from "@mui/material";
import ShowProfile from "./ShowProfile";

export default function Profile() {
    //const accessToken = getAccessToken(req, res);
    //console.log(accessToken);

    return (
        <>
            <AppMenu></AppMenu>
            {/* @ts-expect-error Async Server Component */}
            <ShowProfile></ShowProfile>
            <Button>Edit Profile</Button>
        </>
    );
}
