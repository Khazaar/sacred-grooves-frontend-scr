import React, { useContext, useEffect, useState } from "react";
import { UserRoles } from "@/enums";
import { types } from "mobx-state-tree";

import { toJS } from "mobx";
import { ProfileModel } from "@/models/profileModel";
import { ProfilesModel } from "@/models/profilesModel";
import ProfilePage from "../components/ProfilePage";
import { MobxContext } from "../_app";
import { enableStaticRendering } from "mobx-react";

// enable static rendering ONLY on server
const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

export const getStaticProps = async ({
    params,
}: {
    params: { sub: string };
}) => {
    const urlParams = new URLSearchParams();
    urlParams.append("targetSub", params.sub);

    const response = await fetch(
        process.env.NEST_HOST + "/profiles?" + params,
        {
            method: "GET",
        }
    );
    const profilesData: any[] = await response.json();

    return {
        props: { data: { profilesData } },
    };
};

export async function getAllProfilesSubs() {
    //const profilesContext = useContext(MobxContext);
    return ["google-oauth2|100821398063397699203"];
    // return ["google"];
}

export async function getStaticPaths() {
    const subs = await getAllProfilesSubs();
    const pathsWithParams = subs.map((sub) => {
        return { params: { sub: sub } };
    });
    return {
        paths: pathsWithParams,
        fallback: false,
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

export default function ProfileMyIndex({ data }: { data: ProfileModel }) {
    return (
        <>
            {data && (
                <ProfilePage profileProps={{ profile: data }}></ProfilePage>
            )}
        </>
    );
}
