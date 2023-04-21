import React, { useEffect, useState } from "react";
import AppMenu from "./AppMenu";
import { ProfileModel } from "@/models/models";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getProfiles } from "@/service/profile.service";

interface LayoutProps {
    children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    const { user, error, isLoading } = useUser();
    const [profileMy, setProfileMy] = useState<ProfileModel>();
    useEffect(() => {
        if (user?.sub)
            getProfiles(user.sub).then((data) => {
                data && setProfileMy(data[0]);
                console.log(data);
            });
    }, []);
    return (
        <>
            <AppMenu
                appMenuProps={{
                    user: profileMy?.user,
                }}
            ></AppMenu>
            {children}
        </>
    );
}
