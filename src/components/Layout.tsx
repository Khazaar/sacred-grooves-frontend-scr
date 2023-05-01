"use client";
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import AppMenu from "./AppMenu";

import { useUser } from "@auth0/nextjs-auth0/client";
import { ProfileModel } from "@/models/profileModel";
import { ProfilesModel } from "@/models/profilesModel";

interface LayoutProps {
    children: React.ReactNode;
}
export const MobxContextProfileMy = createContext<ProfileModel>(
    null as unknown as ProfileModel
);

export function useProfileMy() {
    return useContext(MobxContextProfileMy);
}

function Layout({ children }: LayoutProps) {
    const { user, error, isLoading } = useUser();
    const [myProfileData, setMyProfileData] = useState();
    const [myProfile, setMyProfile] = useState<ProfileModel>(
        new ProfileModel()
    );
    useEffect(() => {
        if (user?.sub)
            getProfilesData(user?.sub, undefined, undefined).then((data) => {
                if (data) setMyProfileData(data[0] as any);
            });
    }, [user]);
    useEffect(() => {
        if (myProfileData) setMyProfile(parseProfile(myProfileData));
    }, [myProfileData]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <MobxContextProfileMy.Provider value={myProfile}>
                <AppMenu />

                {children}
            </MobxContextProfileMy.Provider>
        </Box>
    );
}

{
    /* <MobxContextProfileMy.Provider value={profileMy}>
<AppMenu
    appMenuProps={{
        profile: profiles?.getProfileBySub(user?.sub as any),
    }}
></AppMenu>
</MobxContextProfileMy.Provider> */
}

import { enableStaticRendering } from "mobx-react-lite";
import { parseProfile } from "@/models/utils.model";
import { observer } from "mobx-react";
import { getProfilesData } from "@/service/profile.service";
import { Box } from "@mui/material";

// enableStaticRendering(typeof window === "undefined");

// let clientProfileMy: ProfileModel;

// const initProfileMy = (initData: any) => {
//     let profileMy = clientProfileMy ?? new ProfileModel();
//     if (initData) {
//         profileMy = parseProfile(initData);
//     }
//     if (typeof window === "undefined") return profileMy;
//     if (!clientProfileMy) clientProfileMy = profileMy;
//     return profileMy;
// };

export default observer(Layout);
