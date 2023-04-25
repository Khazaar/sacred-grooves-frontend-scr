import { makeObservable, observable, action } from "mobx";
import { ProfileModel } from "./profileModel";
import { ArtistModel } from "./artistModel";
import { OrganizerModel } from "./organizerModel";
import { PictureModel } from "./pictureModel";
import { UserModel } from "./userModel";
import getProfiles from "@/pages/api/profiles";

export class ProfilesModel {
    profiles: ProfileModel[] = [];
    state: "pending" | "done" | "error" = "pending";
    constructor() {
        makeObservable(this, {
            profiles: observable,
            state: observable,
            fetchCommunity: action,
            getAllSubs: action,
        });
    }
    async fetchCommunity() {
        // try {
        //     const profiles = await getProfiles(undefined, "any");
        //     if (profiles) this.profiles = profiles;
        //     this.state = "done";
        //     console.log("Community fetched");
        //     //console.log(this.profiles);
        // } catch (error) {
        //     this.state = "error";
        //     console.log(error);
        // }
    }

    getProfileBySub(sub: string) {
        return this.profiles.find((prf) => prf.auth0sub === sub);
    }

    getAllSubs() {
        return this.profiles.map((prf) => prf.auth0sub);
    }

    async hydrate(data: any) {
        const profiles: ProfileModel[] = [];
        if (data.profiles)
            data.profiles.forEach((prf: any) => {
                const profileMy = new ProfileModel(prf.auth0sub);
                profileMy.user = new UserModel();
                profileMy.user.email = prf.user.email;
                profileMy.user.nickName = prf.user.nickName;
                profileMy.user.firstName = prf.user.firstName;
                profileMy.user.lastName = prf.user.lastName;
                profileMy.user.telegramName = prf.user.telegramName;
                profileMy.user.avatar = new PictureModel();
                profileMy.user.avatar.pictureS3Url =
                    prf.user?.avatar?.pictureS3Url;
                if (prf.artist) {
                    profileMy.artist = new ArtistModel();
                    profileMy.artist.artistTypes = prf.artist.artistTypes;
                    profileMy.artist.musicStyles = prf.artist.musicStyles;
                }
                if (prf.organizer != undefined) {
                    profileMy.organizer = new OrganizerModel();
                    profileMy.organizer.mainLocation =
                        prf.organizer.mainLocation;
                }
                profiles.push(profileMy);
            });
        this.profiles = profiles;
    }
}
