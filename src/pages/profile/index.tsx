import React, { useEffect, useState } from "react";
import AppMenu from "@/pages/components/AppMenu";
import { UserRoles } from "@/enums";
import { types } from "mobx-state-tree";

// import { getProfileBySub } from "@/service/profile.service";
import ProfileMy from "../components/ProfileMy";
import { useUser } from "@auth0/nextjs-auth0/client";

import { toJS } from "mobx";
import { ProfileModel } from "@/models/profileModel";
import { ProfilesModel } from "@/models/profilesModel";

export async function getAllProfilesSubs() {
    const community = new ProfilesModel();

    await community.fetchCommunity();
    return community.getAllSubs();
}

export async function getStaticPaths() {
    // const paths = await getAllProfilesSubs();
    // console.log(paths);
    const mockPathes = [
        {
            params: {
                sub: "1",
            },
        },

        // https://dev.to/alex1998dmit/how-to-use-mobx-in-nextjs-application-with-demo-4oe5
    ];
    // return {
    //     paths: [
    //         // See path selection below
    //         { params: { paths } },
    //     ],
    //     fallback: false,
    // };
    return { paths: mockPathes, fallback: false };
}

export async function getStaticProps({ params }: { params: { sub: string } }) {
    // const community = new CommunityModel();
    // await community.fetchCommunity();
    // const profileData = community.profiles[0];
    const profileData = new ProfileModel();
    const serializedModel = toJS(profileData);
    return {
        props: JSON.stringify(serializedModel),
    };
}

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

export default async function ProfileMyIndex({
    params,
}: {
    params: { profileData: ProfileModel };
}) {
    return (
        <>
            {/* {params.profileData && (
                <ProfileMy
                    profileProps={{ profile: params.profileData }}
                ></ProfileMy>
            )} */}
        </>
    );
}
