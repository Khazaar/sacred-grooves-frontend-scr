import React, { useEffect, useState } from "react";
import AppMenu from "@/pages/components/AppMenu";
import { UserRoles } from "@/enums";
import { types } from "mobx-state-tree";
import { ProfileModel, UserModel } from "@/models/models";
// import { getProfileBySub } from "@/service/profile.service";
import ProfileMy from "../components/ProfileMy";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getProfiles } from "@/service/profile.service";

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

export default function ProfileMyIndex() {
    const [profileMy, setProfileMy] = useState<ProfileModel>();
    const { user, error, isLoading } = useUser();
    useEffect(() => {
        if (user?.sub)
            getProfiles(user.sub).then((data) => {
                data && setProfileMy(data[0]);
                console.log(data);
            });
    }, []);
    console.log(profileMy);
    return (
        <>
            {profileMy && (
                <ProfileMy profileProps={{ profile: profileMy }}></ProfileMy>
            )}
        </>
    );
}
