import { makeObservable, observable, action, makeAutoObservable } from "mobx";
import { ArtistModel } from "./artistModel";
import { OrganizerModel } from "./organizerModel";
import { UserModel } from "./userModel";
import { UserRoles } from "@/enums";

export class ProfileModel {
    user: UserModel = new UserModel();
    artist?: ArtistModel = new ArtistModel();
    organizer?: OrganizerModel = new OrganizerModel();
    auth0sub?: string;
    roles: UserRoles[] = [];
    id: string = "";

    constructor(auth0sub?: string) {
        this.auth0sub = auth0sub;
        makeObservable(this, {
            user: observable,
            getRoles: action,
            artist: observable,
            organizer: observable,
        });
        //makeAutoObservable(this);
    }

    getRoles() {
        this.roles = [];
        if (this.artist) this.roles.push(UserRoles.Artist);
        if (this.organizer) this.roles.push(UserRoles.Organizer);
        return this.roles;
    }
}
