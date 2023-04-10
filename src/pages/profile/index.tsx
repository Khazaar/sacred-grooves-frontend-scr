import React from "react";
import AppMenu from "@/components/AppMenu";
import { Button } from "@mui/material";
import ShowProfile from "./showProfile";

export default function Profile() {
    //const accessToken = getAccessToken(req, res);
    //console.log(accessToken);

    return (
        <>
            <AppMenu></AppMenu>
            <ShowProfile></ShowProfile>
            <Button href="/profile/editProfile">Edit Profile</Button>
        </>
    );
}
