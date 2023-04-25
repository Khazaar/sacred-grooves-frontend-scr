import { enableStaticRendering } from "mobx-react-lite";
import { ProfilesModel } from "@/models/profilesModel";

enableStaticRendering(typeof window === "undefined");

let clientProfiles: ProfilesModel;

const initProfiles = (initData: any) => {
    const profiles = clientProfiles ?? new ProfilesModel();
    if (initData) profiles.hydrate(initData);

    if (typeof window === "undefined") return profiles;
    if (!clientProfiles) clientProfiles = profiles;
    return profiles;
};

export function useProfiles(initData: any) {
    return initProfiles(initData);
}
