import { enableStaticRendering } from "mobx-react-lite";
import { ProfilesModel } from "@/models/profilesModel";
import { ProfileModel } from "@/models/profileModel";

enableStaticRendering(typeof window === "undefined");

let clientProfiles: ProfilesModel;
let clientProfile: ProfileModel;

const initProfiles = (initData: any) => {
    const profiles = clientProfiles ?? new ProfilesModel();
    if (initData) profiles.hydrate(initData);

    if (typeof window === "undefined") return profiles;
    if (!clientProfiles) clientProfiles = profiles;
    return profiles;
};
// const initProfile = (initData: any) => {
//     const profile = clientProfile ?? new ProfileModel();
//     if (initData) profile.hydrate(initData);

//     if (typeof window === "undefined") return profile;
//     if (!clientProfiles) clientProfiles = profile;
//     return profile;
// };

export function useProfiles(initData: any) {
    return initProfiles(initData);
}
// export function useProfile(initData: any) {
//     return initProfiles(initData);
// }
