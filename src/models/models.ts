import { getProfilesApi } from "@/pages/api/profiles";
import { getProfiles } from "@/service/profile.service";
import {
    action,
    makeAutoObservable,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
enum Roles {
    artist = "artist",
    organizer = "organizer",
}

export class UserModel {
    email: string = "";
    nickName: string = "";
    firstName: string = "";
    lastName: string = "";
    telegramName?: string = "";
    avatar: PictureModel;
    mapLocation?: MapLocationModel;
    isEditing: boolean = false;

    constructor() {
        makeObservable(this, { isEditing: observable, nickName: observable });
        this.avatar = new PictureModel();
    }
}

export class PictureModel {
    title?: string = "";
    pictureS3Url?: string = "";
    isAvaratSelected: boolean = false;
    constructor() {
        makeObservable(this, { title: observable, pictureS3Url: observable });
    }
}

export class ArtistModel {
    artistTypes?: string[];
    musicStyles?: string[];
    profileId?: number;
}
export class OrganizerModel {
    mainLocation?: string;

    constructor() {
        makeAutoObservable(this);
    }
}
export class ProfileModel {
    user: UserModel;
    artist?: ArtistModel;
    organizer?: OrganizerModel;
    auth0sub?: string;
    roles?: Roles[] = [];

    constructor(auth0sub?: string) {
        this.auth0sub = auth0sub;
        this.user = new UserModel();
        makeObservable(this, { user: observable, getRoles: action });
    }

    getRoles() {
        this.roles = [];
        if (this.artist) this.roles.push(Roles.artist);
        if (this.organizer) this.roles.push(Roles.organizer);
        return this.roles;
    }
}

export class MapLocationModel {
    name?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    city?: string;
    country?: string;
}

export class CommunityModel {
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
        try {
            const profiles = await getProfiles(undefined, "any");
            if (profiles) this.profiles = profiles;
            this.state = "done";
            console.log("Community fetched");
            //console.log(this.profiles);
        } catch (error) {
            this.state = "error";
            console.log(error);
        }
    }

    getProfileBySub(sub: string) {
        return this.profiles.find((prf) => prf.auth0sub === sub);
    }

    getAllSubs() {
        return this.profiles.map((prf) => prf.auth0sub);
    }
}
