import React, { useContext, useEffect, useState } from "react";
import ProfilePage from "../../components/profilePage/ProfilePage";
import { enableStaticRendering } from "mobx-react";
import { parseProfile } from "@/models/utils.model";
import { Box } from "@mui/material";
import { useMobxContext } from "@/components/layout/Layout";

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
    const mobxContext = useMobxContext();
    mobxContext.profilesAll.setCurrentProfileById(profile.id);
    return (
        <Box sx={{ width: "80%" }}>
            {profile != undefined && (
                <ProfilePage profileProps={{ profile: profile }} />
            )}
        </Box>
    );
}
