import { getProfiles } from "@/service/profile.service";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { ProfileModel, UserModel } from "@/models/models";
import ProfileItem from "../components/ProfileItem";

function IndexProfiles() {
    const [profiles, setProfiles] = useState<ProfileModel[]>();
    useEffect(() => {
        getProfiles(undefined, "any").then((data) => {
            if (data) setProfiles(data);
        });
    }, []);

    return (
        <>
            {profiles &&
                profiles.map((prf) => {
                    return (
                        <ProfileItem
                            profileItemProps={{ profile: prf }}
                        ></ProfileItem>
                    );
                })}
        </>
    );
}

export default IndexProfiles;
