import React, { useContext, useEffect, useState } from "react";
import AppMenu from "./AppMenu";

import { useUser } from "@auth0/nextjs-auth0/client";
import { MobxContext } from "../_app";

interface LayoutProps {
    children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    const { user, error, isLoading } = useUser();
    //const [profileMy, setProfileMy] = useState<ProfileModel>();
    // useEffect(() => {
    //     if (user?.sub)
    //         getProfiles(user.sub).then((data) => {
    //             data && setProfileMy(data[0]);
    //             console.log(data);
    //         });
    // }, [user]);
    const profiles = useContext(MobxContext);
    return (
        <>
            <AppMenu
                appMenuProps={{
                    profile: profiles.getProfileBySub(user?.sub as any),
                }}
            ></AppMenu>
            {children}
        </>
    );
}
