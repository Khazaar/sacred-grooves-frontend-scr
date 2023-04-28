import React, { useContext, useEffect, useState } from "react";
import { UserRoles } from "@/enums";
import { types } from "mobx-state-tree";

import { toJS } from "mobx";
import { ProfileModel } from "@/models/profileModel";
import { ProfilesModel } from "@/models/profilesModel";
import ProfilePage from "../../components/ProfilePage";
import { MobxContext } from "../_app";
import { enableStaticRendering } from "mobx-react";
import { parseProfile } from "@/models/utils.model";

// enable static rendering ONLY on server
const isServer = typeof window === "undefined";
enableStaticRendering(isServer);
type ProfileProps = {
    profileData: any;
};

export const getStaticProps = async ({
    params,
}: {
    params: { id: string };
}) => {
    const urlParams = new URLSearchParams();
    urlParams.append("targetId", params.id);

    const response = await fetch(
        process.env.NEST_HOST + "/profiles?" + urlParams,
        {
            method: "GET",
        }
    );
    const profilesData: any[] = await response.json();
    const profileData: any = profilesData[0];

    return {
        props: {
            profileData: profileData,
        },
    };
};

export async function getAllProfilesIds() {
    const response = await fetch(process.env.NEST_HOST + "/profiles/ids", {
        method: "GET",
    });
    const idsData: any[] = await response.json();
    return idsData;
}

export async function getStaticPaths() {
    const ids = await getAllProfilesIds();
    const pathsWithParams = ids.map((id) => {
        return { params: { id: id.toString() } };
    });
    return {
        paths: pathsWithParams,
        fallback: "blocking",
    };
}

export default function IndexProfile({ profileData }: { profileData: any }) {
    const profile = parseProfile(profileData);
    return (
        <>
            {profile != undefined && (
                <ProfilePage profileProps={{ profile: profile }} />
            )}
        </>
    );
}
