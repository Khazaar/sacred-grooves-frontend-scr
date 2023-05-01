import { makeObservable, observable, action, makeAutoObservable } from "mobx";
import { ProfileModel } from "./profileModel";
import { ArtistModel } from "./artistModel";
import { OrganizerModel } from "./organizerModel";
import { PictureModel } from "./pictureModel";
import { UserModel } from "./userModel";
import getProfiles from "@/pages/api/profiles";
import { parseProfile } from "./utils.model";
import { UserRoles } from "@/enums";

type RolesCheckedType = {
    role: UserRoles;
    isSelected: boolean;
};

export class ProfilesModel {
    profiles: ProfileModel[] = [];
    currentProfile: ProfileModel = new ProfileModel();
    state: "pending" | "done" | "error" = "pending";
    ids: string[] = [];
    profilesFiltered: ProfileModel[] = [];
    rolesSelected: RolesCheckedType[] = [
        { role: UserRoles.Artist, isSelected: false },
        { role: UserRoles.Organizer, isSelected: false },
        { role: UserRoles.SupportTeam, isSelected: false },
    ];
    enableRoleFiltering = false;
    enablePromptFiltering = false;
    promptFilter: string = "";
    constructor() {
        // makeObservable(this, {
        //     profiles: observable,
        //     state: observable,
        //     ids: observable,
        //     getAllSubs: action,
        //     rolesSelected: observable,
        //     enableRoleFiltering: observable,
        //     getProfilesFiltered: action,
        //     setRoleSelected: action,
        //     profilesFiltered: observable,
        // });
        makeAutoObservable(this);
    }

    getProfilesFiltered() {
        const res = this.profiles.filter((prf) => {
            if (this.enableRoleFiltering)
                return this.rolesSelected.some((roleSelected) => {
                    if (
                        roleSelected.isSelected &&
                        prf.getRoles().includes(roleSelected.role)
                    )
                        return true;
                });
            else if (this.enablePromptFiltering)
                return prf.user.nickName
                    .toLowerCase()
                    .includes(this.promptFilter.toLowerCase());
            else return true;
        });
        return res;
    }

    setRoleSelected(role: UserRoles, isSelected: boolean) {
        const res = this.rolesSelected.find(
            (roleSelected) => roleSelected.role === role
        );
        if (res) res.isSelected = isSelected;
        if (this.rolesSelected.some((roleSelected) => roleSelected.isSelected))
            this.enableRoleFiltering = true;
        else this.enableRoleFiltering = false;
        this.profilesFiltered = this.getProfilesFiltered();
    }
    setPromptFilter(prompt: string) {
        this.promptFilter = prompt;
        if (prompt.length > 0) this.enablePromptFiltering = true;
        else this.enablePromptFiltering = false;
        this.profilesFiltered = this.getProfilesFiltered();
    }

    setCurrentProfileById(id: string) {
        const res = this.profiles.find((prf) => prf.id === id);
        if (res) this.currentProfile = res;
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
