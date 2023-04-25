import { makeObservable, observable, action } from "mobx";
import { ArtistModel } from "./artistModel";
import { OrganizerModel } from "./organizerModel";
import { UserModel } from "./userModel";
import { UserRoles } from "@/enums";

export class ProfileModel {
    user: UserModel;
    artist?: ArtistModel;
    organizer?: OrganizerModel;
    auth0sub?: string;
    roles?: UserRoles[] = [];

    constructor(auth0sub?: string) {
        this.auth0sub = auth0sub;
        this.user = new UserModel();
        makeObservable(this, { user: observable, getRoles: action });
    }

    getRoles() {
        this.roles = [];
        if (this.artist) this.roles.push(UserRoles.Artist);
        if (this.organizer) this.roles.push(UserRoles.Organizer);
        return this.roles;
    }
}
