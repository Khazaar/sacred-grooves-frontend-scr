"use client";
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import AppMenu from "./AppMenu";
import { parseProfile } from "@/models/utils.model";
import { observer } from "mobx-react";
import { getProfilesData } from "@/service/profile.service";
import { Box } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ProfileModel } from "@/models/profileModel";
import { ProfilesModel } from "@/models/profilesModel";

interface LayoutProps {
    children: React.ReactNode;
}
type MobxContextProps = {
    profileMy: ProfileModel;
    profilesAll: ProfilesModel;
};

export const MobxContext = createContext<MobxContextProps>({
    profileMy: null as unknown as ProfileModel,
    profilesAll: null as unknown as ProfilesModel,
});

export function useMobxContext() {
    return useContext(MobxContext);
}

function Layout({ children }: LayoutProps) {
    const { user, error, isLoading } = useUser();
    const [profileMyData, setProfileMyData] = useState();
    const [profilesData, setProfilesData] = useState<any[]>();
    const [profileMy, setProfileMy] = useState<ProfileModel>(
        new ProfileModel()
    );
    const [profiles, setProfiles] = useState<ProfilesModel>(
        new ProfilesModel()
    );
    useEffect(() => {
        if (user?.sub)
            getProfilesData(user?.sub, undefined, undefined).then((data) => {
                if (data) setProfileMyData(data[0] as any);
            });
        getProfilesData(undefined, "any", undefined).then((data) => {
            if (data) setProfilesData(data);
        });
    }, [user]);
    useEffect(() => {
        if (profileMyData) setProfileMy(parseProfile(profileMyData));
    }, [profileMyData]);
    useEffect(() => {
        if (profilesData) {
            const prm = new ProfilesModel();
            profilesData.forEach((profile) => {
                prm.profiles.push(parseProfile(profile));
                prm.profilesFiltered.push(parseProfile(profile));
            });
            setProfiles(prm);
        }
    }, [profilesData]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <MobxContext.Provider
                value={{ profileMy: profileMy, profilesAll: profiles }}
            >
                <AppMenu />

                {children}
            </MobxContext.Provider>
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

export default observer(Layout);
