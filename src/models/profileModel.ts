import { makeObservable, observable, action, makeAutoObservable } from "mobx";
import { ArtistModel } from "./artistModel";
import { OrganizerModel } from "./organizerModel";
import { UserModel } from "./userModel";
import { UserRoles } from "@/enums";
import { parseProfile } from "./utils.model";
import { SupportTeamModel } from "./supportTeamModel";
import { any } from "underscore";

export class ProfileModel {
    user: UserModel = new UserModel();
    artist: ArtistModel = new ArtistModel();
    organizer: OrganizerModel = new OrganizerModel();
    supportTeam: SupportTeamModel = new SupportTeamModel();
    auth0sub?: string;
    id: string = "";
    isEditing = false;

    constructor(auth0sub?: string) {
        this.auth0sub = auth0sub;
        makeObservable(this, {
            user: observable,
            getRoles: action,
            artist: observable,
            organizer: observable,
            isEditing: observable,
        });
        //makeAutoObservable(this);
    }

    getRoles() {
        const roles: UserRoles[] = [];
        if (this.artist.isActive) roles.push(UserRoles.Artist);
        if (this.organizer.isActive) roles.push(UserRoles.Organizer);
        if (this.supportTeam.isActive) roles.push(UserRoles.SupportTeam);
        return roles;
    }

    async hydrate(data: any) {
        const profile = parseProfile(data);
    }
}
