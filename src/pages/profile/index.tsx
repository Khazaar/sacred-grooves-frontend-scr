import React, { useEffect, useState } from "react";
import AppMenu from "@/pages/components/AppMenu";
import { Box, Button, Tabs, Typography } from "@mui/material";

import { getMe } from "@/service/user.service";
import { UserRoles } from "@/enums";
import EditArtist from "./artist/editArtist";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createArtistMe } from "@/service/artist.service";
import { createOrganizer } from "@/service/organizer.service";
import { Entries } from "type-fest";
import { types } from "mobx-state-tree";

import { ProfileModel, UserModel } from "@/models/models";
import { getProfileMy } from "@/service/profile.service";

import { MyProfileProvider, useMyProfile } from "@/MyProfileProvider";
import Profile from "@/pages/components/Profile";

const RolesClaimed = types
    .model({
        Artist: false,
        Organizer: false,
        SupportTeam: false,
        Visitor: false,
    })
    .actions((self) => ({
        setRoleClaimed(role: UserRoles, value: boolean) {
            self[role] = value;
        },
    }));

const rolesClaimed = RolesClaimed.create();

export default function ProfileMy() {
    const [profileMy, setProfileMy] = useState<ProfileModel>();
    useEffect(() => {
        getProfileMy().then((data) => {
            data && setProfileMy(data);
            console.log(data);
        });
    }, []);
    console.log(profileMy);

    // useEffect(() => {
    //     console.log(rolesClaimed);
    // }, [rolesClaimed]);

    // useEffect(() => {
    //     if (profileMy?.artist) {
    //         setTabValue("0");
    //         rolesClaimed.setRoleClaimed(UserRoles.Artist, true);
    //     }
    //     if (profileMy?.organizer) {
    //         rolesClaimed.setRoleClaimed(UserRoles.Organizer, true);
    //         setTabValue("1");
    //     }
    // }, [profileMy]);

    return (
        <>
            {profileMy && (
                <AppMenu
                    appMenuProps={{
                        user: profileMy?.user,
                    }}
                ></AppMenu>
            )}
            {profileMy && (
                <Profile profileProps={{ profile: profileMy }}></Profile>
            )}
        </>
    );
}
