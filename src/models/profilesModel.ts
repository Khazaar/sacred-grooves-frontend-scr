import { makeObservable, observable, action } from "mobx";
import { ProfileModel } from "./profileModel";
import { ArtistModel } from "./artistModel";
import { OrganizerModel } from "./organizerModel";
import { PictureModel } from "./pictureModel";
import { UserModel } from "./userModel";
import getProfiles from "@/pages/api/profiles";
import { parseProfile } from "./utils.model";

export class ProfilesModel {
    profiles: ProfileModel[] = [];
    state: "pending" | "done" | "error" = "pending";
    ids: string[] = [];
    constructor() {
        makeObservable(this, {
            profiles: observable,
            state: observable,
            ids: observable,
            getAllSubs: action,
        });
    }

    getProfileBySub(sub: string) {
        const res = this.profiles.find((prf) => prf.auth0sub === sub);
        return res ? res : new ProfileModel();
    }

    getAllSubs() {
        return this.profiles.map((prf) => prf.auth0sub);
    }

    async hydrate(data: any) {
        const profiles: ProfileModel[] = [];
        const ids: string[] = [];
        if (data.profiles)
            data.profiles.forEach((prf: any) => {
                profiles.push(parseProfile(prf));
                ids.push(prf.id);
            });
        this.profiles = profiles;
        this.ids = ids;
    }
}
